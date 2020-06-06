package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MessageServiceImpl extends MessageGrpc.MessageImplBase {

  private static final Logger logger = LoggerFactory.getLogger(MessageServiceImpl.class);

  @Override
  public void insert(MessageProto.InsertRequest req, StreamObserver<MessageProto.Reply> responseObserver) {
    logger.info("MessageServiceImpl.insert");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "insert into message (common_user_id, ent_user_id, content, datime, category) value (?,?,?,?,?)";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        ps.setInt(2, req.getEntUserId());
        ps.setString(3, req.getContent());
        ps.setString(4, new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
        ps.setString(5, req.getCategory());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageProto.Reply reply = MessageProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void commonContent(MessageProto.CommonContentRequest req, StreamObserver<MessageProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      String sql = "select * from message where common_user_id = ? and ent_user_id = ? ORDER BY datime;";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        ps.setInt(2, req.getEntUserId());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
      }
      sql = "update message set status = '已读' where common_user_id = ? and ent_user_id = ? and  status = '未读' and category = 'ent_to_common'";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        ps.setInt(2, req.getEntUserId());
        ps.execute();
      }
      resp.put("content", result);
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageProto.Reply reply = MessageProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void entContent(MessageProto.EntContentRequest req, StreamObserver<MessageProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      String sql = "select * from message where common_user_id = ? and ent_user_id = ? ORDER BY datime;";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        ps.setInt(2, req.getEntUserId());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
      }
      sql = "update message set status = '已读' where common_user_id = ? and ent_user_id = ? and  status = '未读' and category = 'common_to_ent'";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        ps.setInt(2, req.getEntUserId());
        ps.execute();
      }
      resp.put("content", result);
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageProto.Reply reply = MessageProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void entTotal(MessageProto.EntTotalRequest req, StreamObserver<MessageProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select count(*) as total from message where ent_user_id = ? and status = '未读' and category = 'common_to_ent'";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result.get(0).get("total"));
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageProto.Reply reply = MessageProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void commonTotal(MessageProto.CommonTotalRequest req, StreamObserver<MessageProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select count(*) as total from message where common_user_id = ? and status = '未读' and category = 'ent_to_common'";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result.get(0).get("total"));
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageProto.Reply reply = MessageProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void entChatTotal(MessageProto.EntChatTotalRequest req, StreamObserver<MessageProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select t.*, (select count(*) from message m where"
          + " t.common_user_id=m.common_user_id and t.ent_user_id=m.ent_user_id"
          + " and  m.status = '未读' and m.category = 'common_to_ent' ) as  count"
          + " from (select distinct common_user_id, ent_user_id from message where ent_user_id = ? ) as t";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageProto.Reply reply = MessageProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void commonChatTotal(MessageProto.CommonChatTotalRequest req, StreamObserver<MessageProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select t.*, (select count(*) from message m where"
          + " t.common_user_id=m.common_user_id and t.ent_user_id=m.ent_user_id"
          + " and  m.status = '未读' and m.category = 'ent_to_common' ) as  count"
          + " from (select distinct common_user_id, ent_user_id from message where common_user_id = ? ) as t";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageProto.Reply reply = MessageProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void messageList(MessageProto.MessageListRequest req, StreamObserver<MessageProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String ent_sql = "select t2.*, name,"
          + " (select content from message m where t2.common_user_id=m.common_user_id and t2.ent_user_id=m.ent_user_id ORDER BY datime DESC limit 1) as content "
          + " from (select distinct * from (select common_user_id, ent_user_id "
          + " from message where ent_user_id = ? ORDER BY datime DESC ) as t) as t2"
          + " left join common_user on t2.common_user_id = id";
      String common_sql = "select t2.*, name,"
          + " (select content from message m where t2.common_user_id=m.common_user_id and t2.ent_user_id=m.ent_user_id ORDER BY datime DESC limit 1) as content "
          + " from (select distinct * from (select common_user_id, ent_user_id "
          + " from message where common_user_id = ? ORDER BY datime DESC ) as t) as t2"
          + " left join enterprise_user on t2.ent_user_id = id";
      String sql = "企业用户".equals(req.getUserCategory()) ? ent_sql : common_sql;
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getUserId());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageProto.Reply reply = MessageProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }
  
  @Override
  public void sysToEnt(MessageProto.SysToEntRequest req, StreamObserver<MessageProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      String sql = "select * from ((select b.id,b.uuid,title, b.doc ->> '$.content' as content, '系统推送', dday as datime "+
      "from bulletin b left join enterprise e on e.industry = b.doc ->> '$.industry' and e.address1 = b.doc ->> '$.address_level1' and e.address2 = b.doc ->> '$.address_level2' "+
      "where dday>=CURRENT_DATE and receiver='企业用户' and e.id = (select enterprise_id from enterprise_user where id = ?)  ORDER BY id desc) union "+
      " (select id, '', title, content, category,  datime  from sys_message where user_category='企业用户' and user_id =? order by datime  desc)) as t ";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setInt(2, req.getId());
        result = DBUtil.getList(ps.executeQuery());
      }
      sql = "update sys_message set status='已读' where user_category='企业用户' and user_id =?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.execute();
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageProto.Reply reply = MessageProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }


  @Override
  public void sysToCommon(MessageProto.SysToCommonRequest req, StreamObserver<MessageProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      String sql = "select * from ((select b.id,b.uuid,title, b.doc ->> '$.content' as content, '系统推送', dday as datime "+
      "from bulletin b left join resume r on r.education = b.doc ->> '$.education' and r.address1 = b.doc ->> '$.address_level1' and r.address2 = b.doc ->> '$.address_level2' "+
      "where dday>=CURRENT_DATE and receiver='个人用户' and r.common_user_id = ? ORDER BY id desc) union "+
      "(select id, '', title, content, category,  datime  from sys_message where user_category='个人用户' and user_id =? order by datime  desc)) as t ";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setInt(2, req.getId());
        result = DBUtil.getList(ps.executeQuery());
      }
      sql = "update sys_message set status='已读' where user_category='个人用户' and user_id =?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.execute();
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageProto.Reply reply = MessageProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void sysTotal(MessageProto.SysTotalRequest req, StreamObserver<MessageProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select count(*) as total from sys_message where user_category=? and user_id=? and status='未读'";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getUserCategory());
        ps.setInt(2, req.getId());
        resp.put("content", DBUtil.getList(ps.executeQuery()).get(0).get("total"));
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageProto.Reply reply = MessageProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
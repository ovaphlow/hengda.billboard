package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JournalServiceImpl extends JournalGrpc.JournalImplBase {

  private static Logger logger = LoggerFactory.getLogger(JournalServiceImpl.class);

  @Override
  public void list(JournalProto.ListRequest req, StreamObserver<JournalProto.Reply> responseObserver) {
    logger.info("JournalServiceImpl.list");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "(select t.datime as journal_date, r.id, r.uuid, r.name, r.address1, r.address2, r.address3, r.qty, r.salary1, r.salary2, r.date, t.category, t.category as data_category,\n"
          + "             (select name from enterprise where id = r.enterprise_id) as enterprise_name from \n"
          + "          (select data_id, datime, category from browse_journal where category = '岗位' and common_user_id =?) as t\n"
          + "          join recruitment as r on data_id = r.id\n" + "union\n"
          + "select t.datime as journal_date, c.id, c.uuid, c.title, c.address_level1, c.address_level2, c.address_level3, '', '', '', c.date, c.category,  t.category as data_category,\n"
          + "         c.school as enterprise_name from\n"
          + "          (select data_id, datime, category from browse_journal where category = '校园招聘' and common_user_id =?) as t\n"
          + "          join campus as c on data_id = c.id\n" + "union\n"
          + "select t.datime as journal_date, re.id, re.uuid, re.title, re.address_level1, re.address_level2, '', re.qty, '', '', re.date1, re.category,  t.category as data_category,\n"
          + "         re.publisher as enterprise_name from\n"
          + "          (select data_id, datime, category from browse_journal where category = '推荐信息' and common_user_id =?) as t\n"
          + "          join recommend as re on data_id = re.id)\n" + "ORDER BY journal_date desc";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        ps.setInt(2, req.getCommonUserId());
        ps.setInt(3, req.getCommonUserId());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalProto.Reply reply = JournalProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void get(JournalProto.GetRequest req, StreamObserver<JournalProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from browse_journal where common_user_id = ? and data_id = ? and category = ? limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        ps.setInt(2, req.getDataId());
        ps.setString(3, req.getCategory());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        if (result.size() == 0) {
          resp.put("content", false);
        } else {
          resp.put("content", result.get(0));
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalProto.Reply reply = JournalProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void delete(JournalProto.DeleteRequest req, StreamObserver<JournalProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "delete from browse_journal where common_user_id = ? and data_id = ? and category=? limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        ps.setInt(2, req.getDataId());
        ps.setString(3, req.getCategory());
        boolean rs = ps.execute();
        resp.put("content", rs);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalProto.Reply reply = JournalProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insert(JournalProto.InsertRequest req, StreamObserver<JournalProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      String sql = "select * from browse_journal where common_user_id = ? and data_id = ? and category = ? limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        ps.setInt(2, req.getDataId());
        ps.setString(3, req.getCategory());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
      }
      if (result.size() == 0 || "0".equals(req.getCommonUserId())) {
        sql = "insert into browse_journal (common_user_id, common_user_uuid, data_id, data_uuid, category, datime) value (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
          ps.setInt(1, req.getCommonUserId());
          ps.setString(2, req.getUuid());
          ps.setInt(3, req.getDataId());
          ps.setString(4, req.getDataUuid());
          ps.setString(5, req.getCategory());
          ps.setString(6, req.getDatime());
          ps.execute();
          resp.put("content", true);
        }
      } else {
        sql = "update browse_journal set datime = ? where common_user_id=? and  data_id=? and category=? ";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
          ps.setString(1, req.getDatime());
          ps.setInt(2, req.getCommonUserId());
          ps.setInt(3, req.getDataId());
          ps.setString(4, req.getCategory());
          ps.execute();
          resp.put("content", true);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalProto.Reply reply = JournalProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insertEdit(JournalProto.InsertEditRequest req, StreamObserver<JournalProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "insert into edit_journal (user_id, user_uuid, category1, category2, datime, data_id, data_uuid, remark) "
          + "value (?,?,?,?,?,?,?,?)";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getUserId());
        ps.setString(2, req.getUserUuid());
        ps.setString(3, req.getCategory1());
        ps.setString(4, req.getCategory2());
        ps.setString(5, req.getDatime());
        ps.setInt(6, req.getDataId());
        ps.setString(7, req.getDataUuid());
        ps.setString(8, req.getRemark());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalProto.Reply reply = JournalProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void editList(JournalProto.EditListRequest req, StreamObserver<JournalProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from edit_journal where user_id = ? and category1 = ? order by datime desc";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setString(2, req.getCategory());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalProto.Reply reply = JournalProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void loginList(JournalProto.LoginListRequest req, StreamObserver<JournalProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from login_journal where user_id = ? and category = ? order by datime desc";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setString(2, req.getCategory());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalProto.Reply reply = JournalProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
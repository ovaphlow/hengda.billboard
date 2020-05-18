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

@SuppressWarnings("unchecked")
public class JournalServiceImpl extends JournalGrpc.JournalImplBase {

  private static Logger logger = LoggerFactory.getLogger(JournalServiceImpl.class);

  @Override
  public void list(JournalRequest req, StreamObserver<JournalReply> responseObserver) {
    logger.info("JournalServiceImpl.list");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
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
        ps.setString(1, body.get("common_user_id").toString());
        ps.setString(2, body.get("common_user_id").toString());
        ps.setString(3, body.get("common_user_id").toString());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalReply reply = JournalReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void get(JournalRequest req, StreamObserver<JournalReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select * from browse_journal where common_user_id = ? and data_id = ? and category = ? limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("common_user_id").toString());
        ps.setString(2, body.get("data_id").toString());
        ps.setString(3, body.get("category").toString());
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
    JournalReply reply = JournalReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void delete(JournalRequest req, StreamObserver<JournalReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "delete from browse_journal where common_user_id = ? and data_id = ? and category=? limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("common_user_id").toString());
        ps.setString(2, body.get("data_id").toString());
        ps.setString(3, body.get("category").toString());
        boolean rs = ps.execute();
        resp.put("content", rs);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalReply reply = JournalReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insert(JournalRequest req, StreamObserver<JournalReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select * from browse_journal where common_user_id = ? and data_id = ? and category = ? limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("common_user_id").toString());
        ps.setString(2, body.get("data_id").toString());
        ps.setString(3, body.get("category").toString());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
      }
      if (result.size() == 0 || "0".equals(body.get("common_user_id").toString())) {
        sql = "insert into browse_journal (common_user_id, common_user_uuid, data_id, category, datime) value (?, ?, ?, ?, ?)";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
          ps.setString(1, body.get("common_user_id").toString());
          ps.setString(2, body.get("uuid").toString());
          ps.setString(3, body.get("data_id").toString());
          ps.setString(4, body.get("category").toString());
          ps.setString(5, body.get("datime").toString());
          ps.execute();
          resp.put("content", true);
        }
      } else {
        sql = "update browse_journal set datime = ? where common_user_id=? and  data_id=? and category=? ";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
          ps.setString(1, body.get("datime").toString());
          ps.setString(2, body.get("common_user_id").toString());
          ps.setString(3, body.get("data_id").toString());
          ps.setString(4, body.get("category").toString());
          ps.execute();
          resp.put("content", true);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalReply reply = JournalReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insertEdit(JournalRequest req, StreamObserver<JournalReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "insert into edit_journal (user_id, user_uuid, category1, category2, datime, data_id, remark) "
          + "value (?,?,?,?,?,?,?)";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("user_id").toString());
        ps.setString(2, body.get("user_uuid").toString());
        ps.setString(3, body.get("category1").toString());
        ps.setString(4, body.get("category2").toString());
        ps.setString(5, body.get("datime").toString());
        ps.setString(6, body.get("data_id").toString());
        ps.setString(7, body.get("remark").toString());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalReply reply = JournalReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void editList(JournalRequest req, StreamObserver<JournalReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select * from edit_journal where user_id = ? and category1 = ? order by datime desc";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("id").toString());
        ps.setString(2, body.get("category").toString());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalReply reply = JournalReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void loginList(JournalRequest req, StreamObserver<JournalReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select * from login_journal where user_id = ? and category = ? order by datime desc";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("id").toString());
        ps.setString(2, body.get("category").toString());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalReply reply = JournalReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
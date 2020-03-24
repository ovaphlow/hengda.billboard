package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select t.datime as journal_date, r.id, r.uuid, r.name, r.address1, r.address2, r.address3, r.qty, r.salary1, r.salary2, r.date, t.category,\n"
          + "   (select name from enterprise where id = r.enterprise_id) as enterprise_name from "
          + "(select data_id, datime, category from browse_journal where category = '岗位' and common_user_id =?) as t "
          + "join recruitment as r on data_id = r.id order by t.datime desc ";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("common_user_id").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
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
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from browse_journal where common_user_id = ? and data_id = ? and category = ? limit 1";
      PreparedStatement ps = conn.prepareStatement(sql);
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
      conn.close();
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
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "delete from browse_journal where common_user_id = ? and data_id = ? and category=? limit 1";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("common_user_id").toString());
      ps.setString(2, body.get("data_id").toString());
      ps.setString(3, body.get("category").toString());
      boolean rs = ps.execute();
      resp.put("content", rs);
      conn.close();
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
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from browse_journal where common_user_id = ? and data_id = ? and category = ? limit 1";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("common_user_id").toString());
      ps.setString(2, body.get("data_id").toString());
      ps.setString(3, body.get("category").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size() == 0) {
        sql = "insert into browse_journal (common_user_id, data_id, category, datime) value (?, ?, ?, ?)";
        ps = conn.prepareStatement(sql);
        ps.setString(1, body.get("common_user_id").toString());
        ps.setString(2, body.get("data_id").toString());
        ps.setString(3, body.get("category").toString());
        ps.setString(4, body.get("datime").toString());
        ps.execute();
        resp.put("content", true);
      } else {
        sql = "update browse_journal set datime = ? where common_user_id=? and  data_id=? and category=? ";
        PreparedStatement ps1 = conn.prepareStatement(sql);
        ps1.setString(1, body.get("datime").toString());
        ps1.setString(2, body.get("common_user_id").toString());
        ps1.setString(3, body.get("data_id").toString());
        ps1.setString(4, body.get("category").toString());
        ps1.execute();
        resp.put("content", true);
      }
      conn.close();
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
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from edit_journal where user_id = ? and category1 = ? order by datime desc";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("id").toString());
      ps.setString(2, body.get("category").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
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
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from login_journal where user_id = ? and category = ? order by datime desc";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("id").toString());
      ps.setString(2, body.get("category").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    JournalReply reply = JournalReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
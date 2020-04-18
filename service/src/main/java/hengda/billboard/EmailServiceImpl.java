package hengda.billboard;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import io.grpc.stub.StreamObserver;

@SuppressWarnings("unchecked")
public class EmailServiceImpl extends EmailGrpc.EmailImplBase {

  @Override
  public void insert(EmailRequest req, StreamObserver<EmailReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "insert into captcha (email,code,datime,user_id,user_category) value (?,?,?,?,?) ";
      PreparedStatement ps = conn.prepareStatement(sql);
      Date date = new Date(System.currentTimeMillis());
      ps.setString(1, body.get("email").toString());
      ps.setString(2, body.get("code").toString());
      ps.setString(3, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date));
      ps.setString(4, body.get("user_id")==null?"0":body.get("user_id").toString());
      ps.setString(5, body.get("user_category")==null?"0":body.get("user_category").toString());
      ps.execute();
      resp.put("content", true);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EmailReply reply = EmailReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void code(EmailRequest req, StreamObserver<EmailReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from captcha where user_id=? and user_category=? and code=? and email=? " + 
      "and str_to_date(datime,'%Y-%m-%d %H:%i:%s') >= now()-interval 10 minute ORDER BY datime DESC limit 1";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("user_id").toString());
      ps.setString(2, body.get("user_category").toString());
      ps.setString(3, body.get("code").toString());
      ps.setString(4, body.get("email").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size() == 0) {
        resp.put("message", false);
      } else {
        resp.put("content", true);
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EmailReply reply = EmailReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void checkRecover(EmailRequest req, StreamObserver<EmailReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from captcha where user_category= ? and code=? and email=? " + 
      "and str_to_date(datime,'%Y-%m-%d %H:%i:%s') >= now()-interval 10 minute ORDER BY datime DESC limit 1";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("user_category").toString());
      ps.setString(2, body.get("code").toString());
      ps.setString(3, body.get("email").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size() == 0) {
        resp.put("message", false);
      } else {
        resp.put("content", true);
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EmailReply reply = EmailReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
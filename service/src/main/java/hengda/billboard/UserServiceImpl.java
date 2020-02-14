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

public class UserServiceImpl extends UserGrpc.UserImplBase {

  private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

  @Override
  public void signIn(UserRequest req, StreamObserver<UserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      logger.debug(req.getData());
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      logger.debug(req.getData());
      Connection conn = DBUtil.getConn();
      String sql = "select * from common_user where phone = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("phone").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size() != 0) {
        resp.put("message", "该用户已存在");
      } else {
        sql = "insert into common_user (phone,password) value (?,?)";
        ps = conn.prepareStatement(sql);
        ps.setString(1, body.get("phone").toString());
        ps.setString(2, body.get("password").toString());
        boolean i = ps.execute();
        resp.put("content", i);
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void logIn(UserRequest req, StreamObserver<UserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      logger.debug(req.getData());
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      logger.debug(req.getData());
      Connection conn = DBUtil.getConn();
      String sql = "select * from common_user" +
              " where phone = ? and password = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("phone").toString());
      ps.setString(2, body.get("password").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size() == 0) {
        resp.put("message", "账号或密码错误");
      } else {
        resp.put("content", result.get(0));
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void get(UserRequest req, StreamObserver<UserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      logger.debug(req.getData());
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      logger.debug(req.getData());
      Connection conn = DBUtil.getConn();
      String sql = "select * from common_user where id = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("id").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size() == 0) {
        resp.put("message", "未找到该用户");
      } else {
        resp.put("content", result.get(0));
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void update(UserRequest req, StreamObserver<UserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      logger.debug(req.getData());
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      logger.debug(req.getData());
      Connection conn = DBUtil.getConn();
      String sql = "update common_user set name = ?, email=?  where id=?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("name").toString());
      ps.setString(2, body.get("email").toString());
      ps.setString(3, body.get("id").toString());
      boolean rs = ps.execute();
      resp.put("content", rs);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }
}

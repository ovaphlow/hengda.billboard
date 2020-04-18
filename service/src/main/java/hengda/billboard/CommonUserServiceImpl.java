package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
public class CommonUserServiceImpl extends CommonUserGrpc.CommonUserImplBase {

  private static final Logger logger = LoggerFactory.getLogger(CommonUserServiceImpl.class);

  @Override
  public void signIn(CommonUserRequest req, StreamObserver<CommonUserReply> responseObserver) {
    logger.info("RecruitmentServiceImpl.signIn");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select " + "(select count(*) from common_user where phone = ? ) as phone,"
          + "(select count(*) from common_user where username = ? ) as username";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("phone").toString());
      ps.setString(2, body.get("username").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      Map<String, String> err = new HashMap<>();
      result.get(0).forEach((k, v) -> {
        if (!"0".equals(v.toString())) {
          err.put(k, v.toString());
        }
      });
      if (err.keySet().size() != 0) {
        resp.put("message", err);
      } else {
        sql = "insert into common_user (phone,password,username) value (?,?,?)";
        ps = conn.prepareStatement(sql);
        ps.setString(1, body.get("phone").toString());
        ps.setString(2, body.get("password").toString());
        ps.setString(3, body.get("username").toString());
        ps.execute();
        resp.put("content", true);
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CommonUserReply reply = CommonUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void logIn(CommonUserRequest req, StreamObserver<CommonUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);

      Connection conn = DBUtil.getConn();
      String sql = "select * from common_user" + " where phone = ? and password = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("phone").toString());
      ps.setString(2, body.get("password").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size() == 0) {
        resp.put("message", "账号或密码错误");
      } else {
        Map<String, Object> userData = result.get(0);
        sql = "insert into login_journal (user_id, ip, address, category, datime) value (?,?,?,?,?)";
        ps = conn.prepareStatement(sql);
        ps.setString(1, userData.get("id").toString());
        ps.setString(2, body.get("ip").toString());
        ps.setString(3, body.get("address").toString());
        ps.setString(4, "个人用户");
        ps.setString(5, new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
        ps.execute();
        resp.put("content", userData);
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CommonUserReply reply = CommonUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void get(CommonUserRequest req, StreamObserver<CommonUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);

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
    CommonUserReply reply = CommonUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void update(CommonUserRequest req, StreamObserver<CommonUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from captcha where user_category=? and code=? and email=? "
          + "and str_to_date(datime,'%Y-%m-%d %H:%i:%s') >= now()-interval 10 minute ORDER BY datime DESC limit 1";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("user_category").toString());
      ps.setString(2, body.get("code").toString());
      ps.setString(3, body.get("email").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size() == 0) {
        resp.put("message", "验证码错误!");  
      } else {
        sql = "update common_user set name = ?, email=?  where id=?";
        ps = conn.prepareStatement(sql);
        ps.setString(1, body.get("name").toString());
        ps.setString(2, body.get("email").toString());
        ps.setString(3, body.get("id").toString());
        ps.execute();
        sql = "insert into edit_journal (user_id, category1, category2, datime) value (?,?,?,?)";
        ps = conn.prepareStatement(sql);
        ps.setString(1, body.get("id").toString());
        ps.setString(2, "个人用户");
        ps.setString(3, "编辑用户信息");
        ps.setString(4, new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
        ps.execute();
        resp.put("content", true);
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CommonUserReply reply = CommonUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void journal(CommonUserRequest req, StreamObserver<CommonUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from  login_journal where user_id = ? and category = ? ORDER BY datime DESC ";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("user_id").toString());
      ps.setString(2, body.get("category").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CommonUserReply reply = CommonUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void recover(CommonUserRequest req, StreamObserver<CommonUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from captcha where user_category=? and code=? and email=? "
          + "and str_to_date(datime,'%Y-%m-%d %H:%i:%s') >= now()-interval 10 minute ORDER BY datime DESC limit 1";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("user_category").toString());
      ps.setString(2, body.get("code").toString());
      ps.setString(3, body.get("email").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      Map<String, String> err = new HashMap<>();
      if (result.size() == 0) {
        err.put("code", "0");
      }
      if (err.keySet().size() != 0) {
        resp.put("message", err);
      } else {
        sql = "update common_user set password =? where email= ?";
        ps = conn.prepareStatement(sql);
        ps.setString(1, body.get("password").toString());
        ps.setString(2, body.get("email").toString());
        ps.execute();
        resp.put("content", true);
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CommonUserReply reply = CommonUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void checkEmail(CommonUserRequest req, StreamObserver<CommonUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from common_user where email = ? and id != ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("email").toString());
      ps.setString(2, body.get("id").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size() != 0) {
        resp.put("message", "该邮箱已被使用!");
      } else {
        resp.put("content", true);
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CommonUserReply reply = CommonUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void checkRecover(CommonUserRequest req, StreamObserver<CommonUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from common_user where email = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("email").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size() == 0) {
        resp.put("message", "该邮箱不存在!");
      } else {
        resp.put("content", true);
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CommonUserReply reply = CommonUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}

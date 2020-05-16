package hengda.billboard;

import com.google.gson.Gson;

import io.grpc.stub.StreamObserver;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@SuppressWarnings("unchecked")
public class EnterpriseUserServiceImpl extends EnterpriseUserGrpc.EnterpriseUserImplBase {

  // private static final Logger logger =
  // LoggerFactory.getLogger(EnterpriseUserServiceImpl.class);

  @Override
  public void signIn(EnterpriseUserRequest req, StreamObserver<EnterpriseUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, String> err = new HashMap<>();
      List<Map<String, Object>> result = new ArrayList<>();
      ResultSet rs;
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select " + "(select count(*) from enterprise_user where phone = ? ) as phone,"
          + "(select count(*) from enterprise where name = ? ) as ent_name";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("phone").toString());
        ps.setString(2, body.get("ent_name").toString());
        rs = ps.executeQuery();
        result = DBUtil.getList(rs);
        result.get(0).forEach((k, v) -> {
          if (!"0".equals(v.toString())) {
            err.put(k, v.toString());
          }
        });
      }
      if (err.keySet().size() != 0) {
        resp.put("message", err);
      } else {
        String entUUID = UUID.randomUUID().toString();
        String entUserUUID = UUID.randomUUID().toString();
        sql = "insert into enterprise (uuid,name,yingyezhizhao_tu) value (?,?,'')";
        try (PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
          ps.setString(1, entUUID);
          ps.setString(2, body.get("ent_name").toString());
          ps.executeUpdate();
          rs = ps.getGeneratedKeys();
        }
        sql = "insert into enterprise_user (uuid, enterprise_uuid ,enterprise_id, password, name, phone) value (?,?,?,?,?,?)";
        if (rs.next()) {
          try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, entUserUUID);
            ps.setString(2, entUUID);
            ps.setInt(3, rs.getInt(1));
            ps.setString(4, body.get("password").toString());
            ps.setString(5, body.get("ent_name").toString());
            ps.setString(6, body.get("phone").toString());
            ps.executeUpdate();
          }
        }
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserReply reply = EnterpriseUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void recover(EnterpriseUserRequest req, StreamObserver<EnterpriseUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select * from captcha where user_category=? and code=? and email=? "
          + "and str_to_date(datime,'%Y-%m-%d %H:%i:%s') >= now()-interval 10 minute ORDER BY datime DESC limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("user_category").toString());
        ps.setString(2, body.get("code").toString());
        ps.setString(3, body.get("email").toString());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
      }
      Map<String, String> err = new HashMap<>();
      if (result.size() != 0) {
        err.put("code", "0");
      }
      if (err.keySet().size() != 0) {
        resp.put("message", err);
      } else {
        sql = "update enterprise_user set password =? where enterprise_id="
            + "(select id from enterprise where email = ? ) ";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
          ps.setString(1, body.get("password").toString());
          ps.setString(2, body.get("email").toString());
          ps.execute();
          resp.put("content", true);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserReply reply = EnterpriseUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void logIn(EnterpriseUserRequest req, StreamObserver<EnterpriseUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      List<Map<String, Object>> result = new ArrayList<>();
      String sql = "select id, uuid,enterprise_id,enterprise_uuid,username,name,phone from enterprise_user where phone = ? and password = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("phone").toString());
        ps.setString(2, body.get("password").toString());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
      }
      if (result.size() == 0) {
        resp.put("message", "账号或密码错误");
      } else {
        Map<String, Object> userData = result.get(0);
        sql = "insert into login_journal (user_id, ip, address, category, datime) value (?,?,?,?,?)";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
          ps.setString(1, userData.get("id").toString());
          ps.setString(2, body.get("ip").toString());
          ps.setString(3, body.get("address").toString());
          ps.setString(4, "企业用户");
          ps.setString(5, new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
          ps.execute();
          resp.put("content", userData);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserReply reply = EnterpriseUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void updatePassword(EnterpriseUserRequest req, StreamObserver<EnterpriseUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      List<Map<String, Object>> result = new ArrayList<>();
      String sql = "select * from enterprise_user where password = ? and id = ? and uuid = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("old_password").toString());
        ps.setString(2, body.get("id").toString());
        ps.setString(3, body.get("uuid").toString());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
      }
      Map<String, String> err = new HashMap<>();
      if (result.size() == 0) {
        err.put("old_password", "0");
        resp.put("message", err);
      } else {
        sql = "update enterprise_user set password = ? where id = ? and uuid = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
          ps.setString(1, body.get("password1").toString());
          ps.setString(2, body.get("id").toString());
          ps.setString(3, body.get("uuid").toString());
          ps.execute();
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserReply reply = EnterpriseUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void checkEmail(EnterpriseUserRequest req, StreamObserver<EnterpriseUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select * from enterprise where email = ? and id != ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("email").toString());
        ps.setString(2, body.get("id").toString());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        if (result.size() != 0) {
          resp.put("message", "该邮箱已被使用!");
        } else {
          resp.put("content", true);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserReply reply = EnterpriseUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void checkRecover(EnterpriseUserRequest req, StreamObserver<EnterpriseUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select * from enterprise where email = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("email").toString());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        if (result.size() == 0) {
          resp.put("message", "该邮箱不存在!");
        } else {
          resp.put("content", true);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserReply reply = EnterpriseUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
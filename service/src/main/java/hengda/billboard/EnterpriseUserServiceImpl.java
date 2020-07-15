package hengda.billboard;

import com.google.gson.Gson;

// import org.slf4j.LoggerFactory;
// import org.slf4j.Logger;

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

public class EnterpriseUserServiceImpl extends EnterpriseUserGrpc.EnterpriseUserImplBase {

  // private static final Logger logger =
  // LoggerFactory.getLogger(EnterpriseUserServiceImpl.class);

  @Override
  public void signIn(EnterpriseUserProto.SignInRequest req,
      StreamObserver<EnterpriseUserProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, String> err = new HashMap<>();
      List<Map<String, Object>> result = new ArrayList<>();
      int enterprise_id = 0;
      String sql = "select * from captcha where user_category='企业用户' and code=? and email=? "
          + "and str_to_date(datime,'%Y-%m-%d %H:%i:%s') >= now()-interval 10 minute ORDER BY datime DESC limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getCode());
        ps.setString(2, req.getEmail());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
        if (result.size() == 0) {
          err.put("code", "0");
        }
      }
      if (err.keySet().size() != 0) {
        resp.put("message", err);
      } else {
        sql = "select (select count(*) from enterprise_user where email = ? ) as email,"
            + "(select count(*) from enterprise where name = ? ) as ent_name";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
          ps.setString(1, req.getEmail());
          ps.setString(2, req.getEntName());
          ResultSet rs = ps.executeQuery();
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
          sql = "insert into enterprise (uuid,name,yingyezhizhao_tu,date) value (?,?,'',date())";
          try (PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, entUUID);
            ps.setString(2, req.getEntName());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
              enterprise_id = rs.getInt(1);
            }
          }
          sql = "insert into enterprise_user (uuid, enterprise_uuid ,enterprise_id, password, name, email, salt) value (?,?,?,?,?,?,?)";
          try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, entUserUUID);
            ps.setString(2, entUUID);
            ps.setInt(3, enterprise_id);
            ps.setString(4, req.getPassword());
            ps.setString(5, req.getEntName());
            ps.setString(6, req.getEmail());
            ps.setString(7, req.getSalt());
            ps.executeUpdate();
          }
          sql = "delete from captcha where user_category='企业用户' and code=? and email=? ";
          try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, req.getCode());
            ps.setString(2, req.getEmail());
            ps.execute();
          }
          resp.put("content", true);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserProto.Reply reply = EnterpriseUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void recover(EnterpriseUserProto.RecoverRequest req,
      StreamObserver<EnterpriseUserProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      String sql = "select * from captcha where user_category=? and code=? and email=? "
          + "and str_to_date(datime,'%Y-%m-%d %H:%i:%s') >= now()-interval 10 minute ORDER BY datime DESC limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getUserCategory());
        ps.setString(2, req.getCode());
        ps.setString(3, req.getEmail());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
      }
      Map<String, String> err = new HashMap<>();
      if (result.size() == 0) {
        err.put("code", "0");
      } else {
        sql = "select * from enterprise_user where email = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
          ps.setString(1, req.getEmail());
          ResultSet rs = ps.executeQuery();
          result = DBUtil.getList(rs);
        }
        sql = "delete from captcha where user_category=? and code=? and email=? ";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
          ps.setString(1, req.getUserCategory());
          ps.setString(2, req.getCode());
          ps.setString(3, req.getEmail());
          ps.execute();
        }
        resp.put("content", result.get(0));
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserProto.Reply reply = EnterpriseUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void updatePassword(EnterpriseUserProto.UpdatePasswordRequest req,
      StreamObserver<EnterpriseUserProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "update enterprise_user set password = ? , salt = ? where id = ? and uuid = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getPassword());
        ps.setString(2, req.getSalt());
        ps.setInt(3, req.getId());
        ps.setString(4, req.getUuid());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserProto.Reply reply = EnterpriseUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void logIn(EnterpriseUserProto.LogInRequest req, StreamObserver<EnterpriseUserProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      String sql = "select * from enterprise_user where (phone = ? or email = ?)";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getPhoneEmail());
        ps.setString(2, req.getPhoneEmail());
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
          ps.setString(2, req.getIp());
          ps.setString(3, req.getAddress());
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
    EnterpriseUserProto.Reply reply = EnterpriseUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void upPasswordCheck(EnterpriseUserProto.UpPasswordCheckRequest req,
      StreamObserver<EnterpriseUserProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      String sql = "select * from enterprise_user where  id = ? and uuid = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setString(2, req.getUuid());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
      }
      Map<String, String> err = new HashMap<>();
      if (result.size() == 0) {
        err.put("old_password", "0");
        resp.put("message", err);
      } else {
        resp.put("content", result.get(0));
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserProto.Reply reply = EnterpriseUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void update(EnterpriseUserProto.UpdateRequest req,
      StreamObserver<EnterpriseUserProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      Map<String, Object> err = new HashMap<>();
      String sql = "select * from captcha where user_category='企业用户' and code=? and email=? "
          + "and str_to_date(datime,'%Y-%m-%d %H:%i:%s') >= now()-interval 10 minute ORDER BY datime DESC limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getCode());
        ps.setString(2, req.getEmail());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
        if (result.size() == 0) {
          err.put("code", "0");
        }
      }
      if (err.keySet().size() != 0) {
        resp.put("message", err);
      } else {
        sql = "update enterprise_user set email = ? , phone = ? where id = ? and uuid = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
          ps.setString(1, req.getEmail());
          ps.setString(2, req.getPhone());
          ps.setInt(3, req.getId());
          ps.setString(4, req.getUuid());
          ps.execute();
        }
        sql = "delete from captcha where user_category='企业用户' and code=? and email=? ";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
          ps.setString(1, req.getCode());
          ps.setString(2, req.getEmail());
          ps.execute();
        }
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserProto.Reply reply = EnterpriseUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void checkPhone(EnterpriseUserProto.CheckPhoneRequest req,
      StreamObserver<EnterpriseUserProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from enterprise_user where phone = ? and id != ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getPhone());
        ps.setInt(2, req.getId());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        if (result.size() != 0) {
          resp.put("message", "该电话号码已被使用!");
        } else {
          resp.put("content", true);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserProto.Reply reply = EnterpriseUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void checkEmail(EnterpriseUserProto.CheckEmailRequest req,
      StreamObserver<EnterpriseUserProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from enterprise_user where email = ? and id != ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getEmail());
        ps.setInt(2, req.getId());
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
    EnterpriseUserProto.Reply reply = EnterpriseUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void checkRecover(EnterpriseUserProto.CheckRecoverRequest req,
      StreamObserver<EnterpriseUserProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from enterprise_user where email = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getEmail());
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
    EnterpriseUserProto.Reply reply = EnterpriseUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
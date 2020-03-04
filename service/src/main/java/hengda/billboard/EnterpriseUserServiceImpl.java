package hengda.billboard;

import com.google.gson.Gson;

import io.grpc.stub.StreamObserver;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
public class EnterpriseUserServiceImpl extends EnterpriseUserGrpc.EnterpriseUserImplBase {

  // private static final Logger logger = LoggerFactory.getLogger(EnterpriseUserServiceImpl.class);

  @Override
  public void signIn(EnterpriseUserRequest req, StreamObserver<EnterpriseUserReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select " + "(select count(*) from enterprise_user where phone = ? ) as phone,"
          + "(select count(*) from enterprise where name = ? ) as ent_name";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("phone").toString());
      ps.setString(2, body.get("ent_name").toString());
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
        sql = "insert into enterprise (name) value (?)";
        ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        ps.setString(1, body.get("ent_name").toString());
        ps.executeUpdate();
        rs = ps.getGeneratedKeys();
        if (rs.next()) {
          sql = "insert into enterprise_user (enterprise_id, password, name, phone) value (?,?,?,?)";
          ps = conn.prepareStatement(sql);
          ps.setInt(1, rs.getInt(1));
          ps.setString(2, body.get("password").toString());
          ps.setString(3, body.get("ent_name").toString());
          ps.setString(4, body.get("phone").toString());
          ps.executeUpdate();
        }
        resp.put("content", true);
      }
      conn.close();
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
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);

      Connection conn = DBUtil.getConn();
      String sql = "select * from enterprise_user where phone = ? and password = ?";
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
        ps.setString(4, "企业用户");
        ps.setString(5, new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
        ps.execute();
        resp.put("content", userData);
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseUserReply reply = EnterpriseUserReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
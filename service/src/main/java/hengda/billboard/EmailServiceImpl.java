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

public class EmailServiceImpl extends EmailGrpc.EmailImplBase {

  @Override
  public void insert(EmailProto.InsertRequest req, StreamObserver<EmailProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "insert into captcha (email,code,datime,user_id,user_category) value (?,?,?,?,?) ";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        Date date = new Date(System.currentTimeMillis());
        ps.setString(1, req.getEmail());
        ps.setString(2, req.getCode());
        ps.setString(3, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date));
        ps.setString(4, req.getUserId() == null ? "0" : req.getUserId().toString());
        ps.setString(5, req.getUserCategory() == null ? "0" : req.getUserCategory().toString());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EmailProto.Reply reply = EmailProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void code(EmailProto.CodeRequest req, StreamObserver<EmailProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      try (Connection conn = DBUtil.getConn()) {
        String sql = "select * from captcha where user_id=? and user_category=? and code=? and email=? "
            + "and str_to_date(datime,'%Y-%m-%d %H:%i:%s') >= now()-interval 10 minute ORDER BY datime DESC limit 1";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setInt(1, req.getUserId());
        ps.setString(2, req.getUserCategory());
        ps.setString(3, req.getCode());
        ps.setString(4, req.getEmail());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        if (result.size() == 0) {
          resp.put("message", false);
        } else {
          resp.put("content", true);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EmailProto.Reply reply = EmailProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void checkRecover(EmailProto.CheckRecoverRequest req, StreamObserver<EmailProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from captcha where user_category= ? and code=? and email=? "
          + "and str_to_date(datime,'%Y-%m-%d %H:%i:%s') >= now()-interval 10 minute ORDER BY datime DESC limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getUserCategory());
        ps.setString(2, req.getCode());
        ps.setString(3, req.getEmail());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        if (result.size() == 0) {
          resp.put("message", false);
        } else {
          resp.put("content", true);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EmailProto.Reply reply = EmailProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
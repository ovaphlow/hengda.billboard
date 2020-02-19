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
public class ResumeServiceImpl extends ResumeGrpc.ResumeImplBase {

  private static final Logger logger = LoggerFactory.getLogger(ResumeServiceImpl.class);

  @Override
  public void get(ResumeRequest req, StreamObserver<ResumeReply> responseObserver) {
    logger.info("RecruitmentServiceImpl.get");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from resume where common_user_id = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("common_user_id").toString());
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
    ResumeReply reply = ResumeReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void update(ResumeRequest req, StreamObserver<ResumeReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = 
            "update\n" +
              "    resume\n" +
              "set\n" +
              "    name=?,\n" +
              "    phone=?,\n" +
              "    email=?,\n" +
              "    gender=?,\n" +
              "    birthday=?,\n" +
              "    school=?,\n" +
              "    education=?,\n" +
              "    date_begin=?,\n" +
              "    date_end=?,\n" +
              "    major=?,\n" +
              "    qiwangzhiwei=?,\n" +
              "    qiwanghangye=?,\n" +
              "    address1=?,\n" +
              "    address2=?,\n" +
              "    address3=?, \n" +
              // "    address4=?,\n" +
              "    yixiangchengshi=?,\n" +
              "    ziwopingjia=?\n" +
              "where\n" +
              "    common_user_id = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("name").toString());
      ps.setString(2, body.get("phone").toString());
      ps.setString(3, body.get("email").toString());
      ps.setString(4, body.get("gender").toString());
      ps.setString(5, body.get("birthday").toString());
      ps.setString(6, body.get("school").toString());
      ps.setString(7, body.get("education").toString());
      ps.setString(8, body.get("date_begin").toString());
      ps.setString(9, body.get("date_end").toString());
      ps.setString(10, body.get("major").toString());
      ps.setString(11, body.get("qiwangzhiwei").toString());
      ps.setString(12, body.get("qiwanghangye").toString());
      ps.setString(13, body.get("address1").toString());
      ps.setString(14, body.get("address2").toString());
      ps.setString(15, body.get("address3").toString());
      // ps.setString(16, body.get("address4").toString());
      ps.setString(16, body.get("yixiangchengshi").toString());
      ps.setString(17, body.get("ziwopingjia").toString());
      ps.setString(18, body.get("common_user_id").toString());
      boolean rs = ps.execute();
      resp.put("content", rs);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    ResumeReply reply = ResumeReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void init(ResumeRequest req, StreamObserver<ResumeReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      
      Connection conn = DBUtil.getConn();
      String sql = "insert into resume (common_user_id) value (?)";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("common_user_id").toString());
      boolean rs = ps.execute();
      resp.put("content", rs);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    ResumeReply reply = ResumeReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
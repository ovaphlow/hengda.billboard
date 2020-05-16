package hengda.billboard;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;

@SuppressWarnings("unchecked")
public class CommonUserScheduleImpl extends CommonUserScheduleGrpc.CommonUserScheduleImplBase {

  @Override
  public void get(CommonUserScheduleRequest req, StreamObserver<CommonUserScheduleReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select * from  common_user_schedule where common_user_id = ? and campus_id = ? ";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("user_id").toString());
        ps.setString(2, body.get("campus_id").toString());
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
    CommonUserScheduleReply reply = CommonUserScheduleReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void user(CommonUserScheduleRequest req, StreamObserver<CommonUserScheduleReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select c.date,c.title,c.uuid,c.address_level1,c.address_level2,c.address_level3,c.address_level4, "
          + "c.category,c.time, c.id, c.school from common_user_schedule s left join campus c on c.id = s.campus_id "
          + "where common_user_id = ? and date>=curdate() order by date,time";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("user_id").toString());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CommonUserScheduleReply reply = CommonUserScheduleReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void count(CommonUserScheduleRequest req, StreamObserver<CommonUserScheduleReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select count(*) as count from common_user_schedule s "
          + "left join campus  c on c.id = s.campus_id where common_user_id = ? and c.date=curdate()";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("user_id").toString());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result.get(0).get("count"));
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CommonUserScheduleReply reply = CommonUserScheduleReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void delete(CommonUserScheduleRequest req, StreamObserver<CommonUserScheduleReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "delete from common_user_schedule where id = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("id").toString());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CommonUserScheduleReply reply = CommonUserScheduleReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insert(CommonUserScheduleRequest req, StreamObserver<CommonUserScheduleReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "insert  into common_user_schedule (common_user_id, campus_id) value (?,?)";
      try(PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
        ps.setString(1, body.get("common_user_id").toString());
        ps.setString(2, body.get("campus_id").toString());
        ps.executeUpdate();
        ResultSet rs = ps.getGeneratedKeys();
        int id = 0;
        if (rs.next()) {
          id = rs.getInt(1);
        }
        resp.put("content", id);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CommonUserScheduleReply reply = CommonUserScheduleReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}

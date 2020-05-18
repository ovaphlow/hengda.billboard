package hengda.billboard;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.sql.Connection;
import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;

@SuppressWarnings("unchecked")
public class OfferServiceImpl extends OfferGrpc.OfferImplBase {

  @Override
  public void entList(OfferRequest req, StreamObserver<OfferReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select o.*, re.name as user_name, r.name as recruitment_name from offer o"
          + " left join recruitment r on o.recruitment_id = r.id left join resume re on o.common_user_id = re.common_user_id"
          + " where r.enterprise_id = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("id").toString());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    OfferReply reply = OfferReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void commonList(OfferRequest req, StreamObserver<OfferReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select o.*, en.name as enterprise_name, r.name as recruitment_name from offer o"
          + " left join recruitment r on o.recruitment_id = r.id left join enterprise en on en.id = r.enterprise_id"
          + " where o.common_user_id = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("id").toString());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
      }
      sql = "update offer set status='已读' where common_user_id = ? and status='未读'";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("id").toString());
        ps.execute();
      }
      resp.put("content", result);
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    OfferReply reply = OfferReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void commonTotal(OfferRequest req, StreamObserver<OfferReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select count(*) as total from offer where common_user_id = ? and status = '未读'";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("id").toString());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result.get(0).get("total"));
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    OfferReply reply = OfferReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insert(OfferRequest req, StreamObserver<OfferReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "insert into offer (recruitment_id, common_user_id, address, mianshishijian, luxian, remark, phone1, phone2, datime) value (?,?,?,?,?,?,?,?,?)";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("recruitment_id").toString());
        ps.setString(2, body.get("common_user_id").toString());
        ps.setString(3, body.get("address").toString());
        ps.setString(4, body.get("mianshishijian").toString());
        ps.setString(5, body.get("luxian").toString());
        ps.setString(6, body.get("remark").toString());
        ps.setString(7, body.get("phone1").toString());
        ps.setString(8, body.get("phone2").toString());
        ps.setString(9, new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    OfferReply reply = OfferReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
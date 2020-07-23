package hengda.billboard;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.sql.Connection;
import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;

public class OfferServiceImpl extends OfferGrpc.OfferImplBase {

  @Override
  public void entList(OfferProto.EntListRequest req, StreamObserver<OfferProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select o.*, re.name as user_name, r.name as recruitment_name from offer o"
          + " left join recruitment r on o.recruitment_id = r.id left join resume re on o.common_user_id = re.common_user_id"
          + " where r.enterprise_id = ? ORDER BY datime DESC";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    OfferProto.Reply reply = OfferProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void commonList(OfferProto.CommonListRequest req, StreamObserver<OfferProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      List<Map<String, Object>> result = new ArrayList<>();
      String sql = "select o.*, en.name as enterprise_name, r.name as recruitment_name from offer o"
          + " left join recruitment r on o.recruitment_id = r.id left join enterprise en on en.id = r.enterprise_id"
          + " where o.common_user_id = ? ORDER BY datime DESC";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ResultSet rs = ps.executeQuery();
        result = DBUtil.getList(rs);
      }
      sql = "update offer set status='已读' where common_user_id = ? and status='未读'";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.execute();
      }
      resp.put("content", result);
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    OfferProto.Reply reply = OfferProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void commonTotal(OfferProto.CommonTotalRequest req, StreamObserver<OfferProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select count(*) as total from offer where common_user_id = ? and status = '未读'";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result.get(0).get("total"));
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    OfferProto.Reply reply = OfferProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insert(OfferProto.InsertRequest req, StreamObserver<OfferProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "insert into offer (recruitment_id, common_user_id, address, mianshishijian, luxian, remark, phone1, phone2, datime) value (?,?,?,?,?,?,?,?,?)";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getRecruitmentId());
        ps.setInt(2, req.getCommonUserId());
        ps.setString(3, req.getAddress());
        ps.setString(4, req.getMianshishijian());
        ps.setString(5, req.getLuxian());
        ps.setString(6, req.getRemark());
        ps.setString(7, req.getPhone1());
        ps.setString(8, req.getPhone2());
        ps.setString(9, new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    OfferProto.Reply reply = OfferProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
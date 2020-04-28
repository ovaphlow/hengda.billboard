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
import java.util.ArrayList;

@SuppressWarnings("unchecked")
public class DeliveryServiceImpl extends DeliveryGrpc.DeliveryImplBase {

  private static final Logger logger = LoggerFactory.getLogger(DeliveryServiceImpl.class);

  @Override
  public void get(DeliveryRequest req, StreamObserver<DeliveryReply> responseObserver) {
    logger.info("get");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from delivery where id = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("id").toString());
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
    DeliveryReply reply = DeliveryReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void details(DeliveryRequest req, StreamObserver<DeliveryReply> responseObserver) {
    logger.info("details");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select d.*,r.name as recruitment_name,re.common_user_id,re.name,"
          + "  re.phone,re.email,re.gender, re.birthday,re.school,re.education,"
          + "  re.date_begin,re.date_end,re.major,re.qiwangzhiwei,re.qiwanghangye,"
          + "  re.address1,re.address2,re.address3,re.yixiangchengshi,re.ziwopingjia \n" + "from delivery d\n"
          + "  left join recruitment r on d.recruitment_id = r.id\n" + "  left join resume re on d.resume_id = re.id\n"
          + " where d.id = ? and re.uuid = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("id").toString());
      ps.setString(2, body.get("uuid").toString());
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
    DeliveryReply reply = DeliveryReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void userDeliveryList(DeliveryRequest req, StreamObserver<DeliveryReply> responseObserver) {
    logger.info("userDeliveryList");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select r.*, d.status, d.datime from delivery d  join "
          + "    recruitment r on d.recruitment_id = r.id  where "
          + "     (select re.id from resume re where re.common_user_id= ? limit 1) = d.resume_id";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("common_user_id").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    DeliveryReply reply = DeliveryReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void userDelivery(DeliveryRequest req, StreamObserver<DeliveryReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from delivery"
          + " where resume_id = (select id from resume where common_user_id = ? limit 1 )" + " and recruitment_id=?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("common_user_id").toString());
      ps.setString(2, body.get("recruitment_id").toString());
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
    DeliveryReply reply = DeliveryReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insert(DeliveryRequest req, StreamObserver<DeliveryReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "insert into " + "delivery (resume_id, resume_uuid, recruitment_id, recruitment_uuid datime)"
          + "value ( (select id from resume where common_user_id = ? limit 1),"
          + "(select uuid from resume where common_user_id = ? limit 1)," + "?,?,?)";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("common_user_id").toString());
      ps.setString(2, body.get("common_user_id").toString());
      ps.setString(3, body.get("recruitment_id").toString());
      ps.setString(4, body.get("recruitment_uuid").toString());
      ps.setString(5, body.get("datime").toString());
      boolean rs = ps.execute();
      resp.put("content", rs);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    DeliveryReply reply = DeliveryReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void search(DeliveryRequest req, StreamObserver<DeliveryReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select re.name as recruitment_name, re.industry, d.status,"
          + "r.education, r.uuid, r.name as name, r.school,d.datime,  d.id, d.recruitment_id, d.resume_id "
          + "from delivery d left join resume r on d.resume_id = r.id left join recruitment re on d.recruitment_id = re.id "
          + "where re.enterprise_id = ? and (select u.enterprise_id from enterprise_user u where u.uuid = ?) = re.enterprise_id ";

      List<String> list = new ArrayList<>();
      list.add(body.get("enterprise_id").toString());
      list.add(body.get("uuid").toString());
      if (body.get("name") != null && !"".equals(body.get("name").toString())) {
        list.add(body.get("name").toString());
        sql += " and r.name like CONCAT(?,'%') ";
      }

      if (body.get("recruitment_name") != null && !"".equals(body.get("recruitment_name").toString())) {
        list.add(body.get("recruitment_name").toString());
        sql += " and re.name like CONCAT(?,'%') ";
      }

      if (body.get("date") != null && !"".equals(body.get("date").toString())) {
        list.add(body.get("date").toString());
        sql += " and SUBSTRING_INDEX(d.datime,' ',1) = ? ";
      }

      if (body.get("status") != null && !"".equals(body.get("status").toString())) {
        list.add(body.get("status").toString());
        sql += " and d.status = ? ";
      }

      if (body.get("education") != null && !"".equals(body.get("education").toString())) {
        list.add(body.get("education").toString());
        sql += " and re.name = ? ";
      }
      sql += " ORDER BY d.datime DESC";
      PreparedStatement ps = conn.prepareStatement(sql);
      for (int inx = 0; inx < list.size(); inx++) {
        ps.setString(inx + 1, list.get(inx));
      }
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    DeliveryReply reply = DeliveryReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void status(DeliveryRequest req, StreamObserver<DeliveryReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "update delivery set status = ? where id = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("status").toString());
      ps.setString(2, body.get("id").toString());
      ps.execute();
      resp.put("content", true);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    DeliveryReply reply = DeliveryReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }
}
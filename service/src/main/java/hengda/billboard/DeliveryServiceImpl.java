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

public class DeliveryServiceImpl extends DeliveryGrpc.DeliveryImplBase {

  private static final Logger logger = LoggerFactory.getLogger(DeliveryServiceImpl.class);

  @Override
  public void get(DeliveryProto.GetRequest req, StreamObserver<DeliveryProto.Reply> responseObserver) {
    logger.info("get");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from delivery where id = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
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
    DeliveryProto.Reply reply = DeliveryProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void recruitmentList(DeliveryProto.RecruitmentListRequest req, StreamObserver<DeliveryProto.Reply> responseObserver) { 
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select d.status,r.education, r.uuid, "
      +"r.name as name, r.school,d.datime, d.id, d.recruitment_id, d.resume_id "
      +"from delivery d left join resume r on d.resume_id = r.id" +
      " where recruitment_id = ? and recruitment_uuid = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getRecruitmentId());
        ps.setString(2, req.getRecruitmentUuid());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    DeliveryProto.Reply reply = DeliveryProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void details(DeliveryProto.DetailsRequest req, StreamObserver<DeliveryProto.Reply> responseObserver) {
    logger.info("details");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn();) {
      String sql = "select d.*,r.name as recruitment_name,re.common_user_id,re.name,"
          + "  re.phone,re.email,re.gender, re.birthday,re.school,re.education,"
          + "  re.date_begin,re.date_end,re.major,re.qiwangzhiwei,re.qiwanghangye,"
          + "  re.address1,re.address2,re.address3,re.yixiangchengshi,re.ziwopingjia \n" + "from delivery d\n"
          + "  left join recruitment r on d.recruitment_id = r.id\n" + "  left join resume re on d.resume_id = re.id\n"
          + " where d.id = ? and re.uuid = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setString(2, req.getUuid());
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
    DeliveryProto.Reply reply = DeliveryProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void userDeliveryList(DeliveryProto.UserDeliveryListRequest req, StreamObserver<DeliveryProto.Reply> responseObserver) {
    logger.info("userDeliveryList");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select r.*, d.status, d.datime from delivery d  join "
          + "    recruitment r on d.recruitment_id = r.id  where "
          + "     (select re.id from resume re where re.common_user_id= ? limit 1) = d.resume_id";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    DeliveryProto.Reply reply = DeliveryProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void userDelivery(DeliveryProto.UserDeliveryRequest req, StreamObserver<DeliveryProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from delivery"
          + " where resume_id = (select id from resume where common_user_id = ? limit 1 )" + " and recruitment_id=?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        ps.setInt(2, req.getRecruitmentId());
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
    DeliveryProto.Reply reply = DeliveryProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insert(DeliveryProto.InsertRequest req, StreamObserver<DeliveryProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "insert into delivery (resume_id, resume_uuid, recruitment_id, recruitment_uuid, datime)"
          + " value ( (select id from resume where common_user_id = ? limit 1),"
          + "(select uuid from resume where common_user_id = ? limit 1),?,?,?)";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        ps.setInt(2, req.getCommonUserId());
        ps.setInt(3, req.getRecruitmentId());
        ps.setString(4, req.getRecruitmentUuid());
        ps.setString(5, req.getDatime());
        boolean rs = ps.execute();
        resp.put("content", rs);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    DeliveryProto.Reply reply = DeliveryProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void search(DeliveryProto.SearchRequest req, StreamObserver<DeliveryProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select re.name as recruitment_name, re.industry, d.status,"
          + "r.education, r.uuid, r.name as name, r.school,d.datime,  d.id, d.recruitment_id, d.resume_id "
          + "from delivery d left join resume r on d.resume_id = r.id left join recruitment re on d.recruitment_id = re.id "
          + "where re.enterprise_id = ? and (select u.enterprise_id from enterprise_user u where u.uuid = ?) = re.enterprise_id ";

      List<String> list = new ArrayList<>();
      list.add(req.getEnterpriseId());
      list.add(req.getUuid());
      if (req.getName() != null && !"".equals(req.getName())) {
        list.add(req.getName());
        sql += " and r.name like CONCAT(?,'%') ";
      }

      if (req.getRecruitmentName() != null && !"".equals(req.getRecruitmentName())) {
        list.add(req.getRecruitmentName());
        sql += " and re.name like CONCAT(?,'%') ";
      }

      if (req.getDate() != null && !"".equals(req.getDate())) {
        list.add(req.getDate());
        sql += " and SUBSTRING_INDEX(d.datime,' ',1) = ? ";
      }

      if (req.getStatus() != null && !"".equals(req.getStatus() )) {
        list.add(req.getStatus());
        sql += " and d.status = ? ";
      }

      if (req.getEducation() != null && !"".equals(req.getEducation())) {
        list.add(req.getEducation());
        sql += " and re.name = ? ";
      }
      sql += " ORDER BY d.datime DESC";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        for (int inx = 0; inx < list.size(); inx++) {
          ps.setString(inx + 1, list.get(inx));
        }
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    DeliveryProto.Reply reply = DeliveryProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void status(DeliveryProto.StatusRequest req, StreamObserver<DeliveryProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "update delivery set status = ? where id = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getStatus());
        ps.setInt(2, req.getId());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    DeliveryProto.Reply reply = DeliveryProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }
}
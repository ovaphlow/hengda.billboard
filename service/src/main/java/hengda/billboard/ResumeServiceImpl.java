package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResumeServiceImpl extends ResumeGrpc.ResumeImplBase {

  private static final Logger logger = LoggerFactory.getLogger(ResumeServiceImpl.class);

  @Override
  public void get(ResumeProto.GetRequest req, StreamObserver<ResumeProto.Reply> responseObserver) {
    logger.info("ResumeServiceImpl.get");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from resume where id = ? and uuid = ?";
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
    ResumeProto.Reply reply = ResumeProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void user(ResumeProto.UserRequest req, StreamObserver<ResumeProto.Reply> responseObserver) {
    logger.info("ResumeServiceImpl.user");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from resume where common_user_id = ? and (select uuid from common_user where id = common_user_id) = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
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
    ResumeProto.Reply reply = ResumeProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void update(ResumeProto.UpdateRequest req, StreamObserver<ResumeProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "update resume set name=?,phone=?, email=?,gender=?,birthday=?,school=?, education=?,\n"
          + "    date_begin=?, date_end=?,major=?,qiwangzhiwei=?,qiwanghangye=?,address1=?,address2=?,\n"
          + "    address3=?, \n" + // " address4=?,\n" +
          "    yixiangchengshi=?,ziwopingjia=? where common_user_id = ? and uuid = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getName());
        ps.setString(2, req.getPhone());
        ps.setString(3, req.getEmail());
        ps.setString(4, req.getGender());
        ps.setString(5, req.getBirthday());
        ps.setString(6, req.getSchool());
        ps.setString(7, req.getEducation());
        ps.setString(8, req.getDateBegin());
        ps.setString(9, req.getDateEnd());
        ps.setString(10, req.getMajor());
        ps.setString(11, req.getQiwangzhiwei());
        ps.setString(12, req.getQiwanghangye());
        ps.setString(13, req.getAddress1());
        ps.setString(14, req.getAddress2());
        ps.setString(15, req.getAddress3());
        // ps.setString(16, body.get("address4());
        ps.setString(16, req.getYixiangchengshi());
        ps.setString(17, req.getZiwopingjia());
        ps.setString(18, req.getCommonUserId());
        ps.setString(19, req.getUuid());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    ResumeProto.Reply reply = ResumeProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void status(ResumeProto.StatusRequest req, StreamObserver<ResumeProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "update resume set status=? where common_user_id=? and uuid=?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getStatus());
        ps.setInt(2, req.getId());
        ps.setString(3, req.getUuid());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    ResumeProto.Reply reply = ResumeProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void init(ResumeProto.InitRequest req, StreamObserver<ResumeProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "insert into resume (common_user_id,uuid) value (?,uuid())";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getCommonUserId());
        boolean rs = ps.execute();
        resp.put("content", rs);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    ResumeProto.Reply reply = ResumeProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void retrieval(ResumeProto.RetrievalRequest req, StreamObserver<ResumeProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = " select r.* from (select distinct * from " + " (select  user_id from ( "
          + "   select common_user_id as user_id, datime from browse_journal where TO_DAYS(NOW())-TO_DAYS(datime)  <= ? union "
          + "   select user_id, datime from edit_journal where category1 = '个人用户' and TO_DAYS(NOW())-TO_DAYS(datime) <= ? union "
          + "   select user_id , datime from login_journal where category = '个人用户' and TO_DAYS(NOW())-TO_DAYS(datime)  <= ?) as t ORDER BY  datime desc) as t2 "
          + " ) as t3 join resume r on user_id = r.common_user_id where r.status = '公开'";
      List<String> list = new ArrayList<>();
      list.add(req.getDay());
      list.add(req.getDay());
      list.add(req.getDay());
      if (req.getName() != null && !"".equals(req.getName())) {
        sql += " and r.name like CONCAT(?,'%') ";
        list.add(req.getName());
      }
      if (req.getQiwanghangye() != null && !"".equals(req.getQiwanghangye())) {
        sql += " and r.qiwanghangye like CONCAT(?,'%') ";
        list.add(req.getQiwanghangye());
      }
      if (req.getQiwangzhiwei() != null && !"".equals(req.getQiwangzhiwei())) {
        sql += " and r.qiwangzhiwei like CONCAT(?,'%') ";
        list.add(req.getQiwangzhiwei());
      }
      if (req.getYixiangchengshi() != null && !"".equals(req.getYixiangchengshi())) {
        sql += " and r.yixiangchengshi like CONCAT(?,'%') ";
        list.add(req.getYixiangchengshi());
      }
      if (req.getEducation() != null && !"".equals(req.getEducation())) {
        sql += " and r.education = ? ";
        list.add(req.getEducation());
      }
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        for (int inx = 0; inx < list.size(); inx++) {
          ps.setString(inx + 1, list.get(inx));
        }
        resp.put("content", DBUtil.getList(ps.executeQuery()));
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    ResumeProto.Reply reply = ResumeProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void recommend(ResumeProto.RecommendRequest req, StreamObserver<ResumeProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = " select r.* from (select distinct * from " + " (select  user_id from ( "
          + "   select common_user_id as user_id, datime from browse_journal where TO_DAYS(NOW())-TO_DAYS(datime)  <= ? union "
          + "   select user_id, datime from edit_journal where category1 = '个人用户' and TO_DAYS(NOW())-TO_DAYS(datime) <= ? union "
          + "   select user_id , datime from login_journal where category = '个人用户' and TO_DAYS(NOW())-TO_DAYS(datime)  <= ?) as t ORDER BY  datime desc) as t2 "
          + " ) as t3 join resume r on user_id = r.common_user_id where r.status = '公开' and  CONCAT(qiwanghangye,qiwangzhiwei) in (select  CONCAT(industry,position) as str from recruitment where enterprise_id = ? and  CONCAT(industry,position) !='')";
      List<String> list = new ArrayList<>();
      list.add(req.getDay());
      list.add(req.getDay());
      list.add(req.getDay());
      list.add(req.getEnterpriseId());
      if (req.getName() != null && !"".equals(req.getName())) {
        sql += " and r.name like CONCAT(?,'%') ";
        list.add(req.getName());
      }
      if (req.getQiwanghangye() != null && !"".equals(req.getQiwanghangye())) {
        sql += " and r.qiwanghangye like CONCAT(?,'%') ";
        list.add(req.getQiwanghangye());
      }
      if (req.getQiwangzhiwei() != null && !"".equals(req.getQiwangzhiwei())) {
        sql += " and r.qiwangzhiwei like CONCAT(?,'%') ";
        list.add(req.getQiwangzhiwei());
      }
      if (req.getYixiangchengshi() != null && !"".equals(req.getYixiangchengshi())) {
        sql += " and r.yixiangchengshi like CONCAT(?,'%') ";
        list.add(req.getYixiangchengshi());
      }
      if (req.getEducation() != null && !"".equals(req.getEducation())) {
        sql += " and r.education = ? ";
        list.add(req.getEducation());
      }
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        for (int inx = 0; inx < list.size(); inx++) {
          ps.setString(inx + 1, list.get(inx));
        }
        resp.put("content", DBUtil.getList(ps.executeQuery()));
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    ResumeProto.Reply reply = ResumeProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void check(ResumeProto.CheckRequest req, StreamObserver<ResumeProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from resume where common_user_id = ? ";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        if (result.size() == 0) {
          resp.put("message", "请完善简历个人信息");
        } else {
          Map<String, Object> map = result.get(0);
          if ((map.get("name") == null || "".equals(map.get("name")))
              || (map.get("phone") == null || "".equals(map.get("phone")))
              || (map.get("email") == null || "".equals(map.get("email")))
              || (map.get("gender") == null || "".equals(map.get("gender")))
              || (map.get("birthday") == null || "".equals(map.get("birthday")))) {
            resp.put("content", false);
          } else {
            resp.put("content", true);
          }
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    ResumeProto.Reply reply = ResumeProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
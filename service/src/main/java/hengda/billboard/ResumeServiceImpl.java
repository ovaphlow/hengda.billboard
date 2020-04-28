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
      String sql = "select * from resume where id = ? and uuid = ?";
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
    ResumeReply reply = ResumeReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void user(ResumeRequest req, StreamObserver<ResumeReply> responseObserver) {
    logger.info("RecruitmentServiceImpl.get");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from resume where common_user_id = ? and (select uuid from common_user where id = common_user_id) = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("common_user_id").toString());
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
      logger.info(body.get("common_user_id").toString());
      logger.info(body.get("uuid").toString());
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
              "    common_user_id = ? and uuid = ?";
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
      ps.setString(19, body.get("uuid").toString());
      ps.execute();
      resp.put("content", true);
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
  public void status(ResumeRequest req, StreamObserver<ResumeReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "update resume set status=? where common_user_id=? and uuid=?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("status").toString());
      ps.setString(2, body.get("id").toString());
      ps.setString(3, body.get("uuid").toString());
      ps.execute();
      resp.put("content", true);
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
      String sql = "insert into resume (common_user_id,uuid) value (?,uuid())";
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

  @Override
  public void retrieval(ResumeRequest req, StreamObserver<ResumeReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = 
      " select r.* from (select distinct * from "+
      " (select  user_id from ( "+
      "   select common_user_id as user_id, datime from browse_journal where TO_DAYS(NOW())-TO_DAYS(datime)  <= ? union "+
      "   select user_id, datime from edit_journal where category1 = '个人用户' and TO_DAYS(NOW())-TO_DAYS(datime) <= ? union "+
      "   select user_id , datime from login_journal where category = '个人用户' and TO_DAYS(NOW())-TO_DAYS(datime)  <= ?) as t ORDER BY  datime desc) as t2 "+
      " ) as t3 join resume r on user_id = r.common_user_id where r.status = '公开'";
      List<String> list = new ArrayList<>();
      list.add(body.get("day").toString());
      list.add(body.get("day").toString());
      list.add(body.get("day").toString());
      if (body.get("name") != null&& !"".equals(body.get("name").toString())) {
        sql += " and r.name like CONCAT(?,'%') ";
        list.add(body.get("name").toString());
      }
      if (body.get("qiwanghangye") != null&& !"".equals(body.get("qiwanghangye").toString())) {
        sql += " and r.qiwanghangye like CONCAT(?,'%') ";
        list.add(body.get("qiwanghangye").toString());
      }
      if (body.get("qiwangzhiwei") != null&& !"".equals(body.get("qiwangzhiwei").toString())) {
        sql += " and r.qiwangzhiwei like CONCAT(?,'%') ";
        list.add(body.get("qiwangzhiwei").toString());
      }
      if (body.get("yixiangchengshi") != null&& !"".equals(body.get("yixiangchengshi").toString())) {
        sql += " and r.yixiangchengshi like CONCAT(?,'%') ";
        list.add(body.get("yixiangchengshi").toString());
      }
      if (body.get("education") != null&& !"".equals(body.get("education").toString())) {
        sql += " and r.education = ? ";
        list.add(body.get("education").toString());
      }
      PreparedStatement ps = conn.prepareStatement(sql);
      for(int inx=0; inx < list.size(); inx ++) {
        ps.setString(inx+1, list.get(inx));
      }
      resp.put("content", DBUtil.getList(ps.executeQuery()));
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
  public void recommend(ResumeRequest req, StreamObserver<ResumeReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = 
      " select r.* from (select distinct * from "+
      " (select  user_id from ( "+
      "   select common_user_id as user_id, datime from browse_journal where TO_DAYS(NOW())-TO_DAYS(datime)  <= ? union "+
      "   select user_id, datime from edit_journal where category1 = '个人用户' and TO_DAYS(NOW())-TO_DAYS(datime) <= ? union "+
      "   select user_id , datime from login_journal where category = '个人用户' and TO_DAYS(NOW())-TO_DAYS(datime)  <= ?) as t ORDER BY  datime desc) as t2 "+
      " ) as t3 join resume r on user_id = r.common_user_id where r.status = '公开' and  CONCAT(qiwanghangye,qiwangzhiwei) in (select  CONCAT(industry,position) as str from recruitment where enterprise_id = ? and  CONCAT(industry,position) !='')";
      List<String> list = new ArrayList<>();
      list.add(body.get("day").toString());
      list.add(body.get("day").toString());
      list.add(body.get("day").toString());
      list.add(body.get("enterprise_id").toString());
      if (body.get("name") != null&& !"".equals(body.get("name").toString())) {
        sql += " and r.name like CONCAT(?,'%') ";
        list.add(body.get("name").toString());
      }
      if (body.get("qiwanghangye") != null&& !"".equals(body.get("qiwanghangye").toString())) {
        sql += " and r.qiwanghangye like CONCAT(?,'%') ";
        list.add(body.get("qiwanghangye").toString());
      }
      if (body.get("qiwangzhiwei") != null&& !"".equals(body.get("qiwangzhiwei").toString())) {
        sql += " and r.qiwangzhiwei like CONCAT(?,'%') ";
        list.add(body.get("qiwangzhiwei").toString());
      }
      if (body.get("yixiangchengshi") != null&& !"".equals(body.get("yixiangchengshi").toString())) {
        sql += " and r.yixiangchengshi like CONCAT(?,'%') ";
        list.add(body.get("yixiangchengshi").toString());
      }
      if (body.get("education") != null&& !"".equals(body.get("education").toString())) {
        sql += " and r.education = ? ";
        list.add(body.get("education").toString());
      }
      PreparedStatement ps = conn.prepareStatement(sql);
      for(int inx=0; inx < list.size(); inx ++) {
        ps.setString(inx+1, list.get(inx));
      }
      resp.put("content", DBUtil.getList(ps.executeQuery()));
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
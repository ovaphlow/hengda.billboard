package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
public class RecruitmentServiceImpl extends RecruitmentGrpc.RecruitmentImplBase {

  private static final Logger logger = LoggerFactory.getLogger(RecruitmentServiceImpl.class);

  @Override
  public void list(RecruitmentRequest req, StreamObserver<RecruitmentReply> responseObserver) {
    logger.info("RecruitmentServiceImpl.list");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Connection conn = DBUtil.getConn();
      String sql = "select * from recruitment";
      PreparedStatement ps = conn.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecruitmentReply reply = RecruitmentReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insert(RecruitmentRequest req, StreamObserver<RecruitmentReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "insert into recruitment ( enterprise_id, name, qty, description, requirement,"
          + "address1, address2, address3, date, salary1, salary2, education, category,"
          + " industry ) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("enterprise_id").toString());
      ps.setString(2, body.get("name").toString());
      ps.setString(3, body.get("qty").toString());
      ps.setString(4, body.get("description").toString());
      ps.setString(5, body.get("requirement").toString());
      ps.setString(6, body.get("address1").toString());
      ps.setString(7, body.get("address2").toString());
      ps.setString(8, body.get("address3").toString());
      ps.setString(9, new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
      ps.setString(10, body.get("salary1").toString());
      ps.setString(11, body.get("salary2").toString());
      ps.setString(12, body.get("education").toString());
      ps.setString(13, body.get("category").toString());
      ps.setString(14, body.get("industry").toString());
      ps.execute();
      resp.put("content", true);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecruitmentReply reply = RecruitmentReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void update(RecruitmentRequest req, StreamObserver<RecruitmentReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "update recruitment set name = ?, qty = ?, description = ?,"
          + "requirement = ?, address1 = ?, address2 = ?, address3 = ?, salary1 = ?,"
          + "salary2 = ?, education = ?, category = ?,  industry = ? where id = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("name").toString());
      ps.setString(2, body.get("qty").toString());
      ps.setString(3, body.get("description").toString());
      ps.setString(4, body.get("requirement").toString());
      ps.setString(5, body.get("address1").toString());
      ps.setString(6, body.get("address2").toString());
      ps.setString(7, body.get("address3").toString());
      ps.setString(8, body.get("salary1").toString());
      ps.setString(9, body.get("salary2").toString());
      ps.setString(10, body.get("education").toString());
      ps.setString(11, body.get("category").toString());
      ps.setString(12, body.get("industry").toString());
      ps.setString(13, body.get("id").toString());
      ps.execute();
      resp.put("content", true);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecruitmentReply reply = RecruitmentReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void status(RecruitmentRequest req, StreamObserver<RecruitmentReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "update recruitment set status = ? where id = ?";
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
    RecruitmentReply reply = RecruitmentReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void get(RecruitmentRequest req, StreamObserver<RecruitmentReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select r.*, e.name as enterprise_name, u.id as ent_user_id\n"+
      "from recruitment r left join enterprise e on e.id=r.enterprise_id\n"+
      "left join enterprise_user u on u.enterprise_id = e.id\n"+
      "where r.id = ?";
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
    RecruitmentReply reply = RecruitmentReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void search(RecruitmentRequest req, StreamObserver<RecruitmentReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      logger.info(req.getData());
      Connection conn = DBUtil.getConn();
      String sql = "select * from recruitment ";
      List<String> list = new ArrayList<>();
      if (body.keySet().size() != 0) {
        sql += " where 1=1 ";
        if (body.get("city") != null && !body.get("city").toString().equals("")) {
          sql += " and (address1 = ? or  address2 = ?) ";
          list.add(body.get("city").toString());
          list.add(body.get("city").toString());
        }
        boolean flg = false;
        String category = "";
        if (body.get("兼职") != null && Boolean.valueOf(body.get("兼职").toString())) {
          category += " category = ? ";
          list.add("兼职");
          flg = true;
        }
        if (body.get("全职") != null && Boolean.valueOf(body.get("全职").toString())) {
          if (flg) {
            category += " or ";
          }
          category += "category = ? ";
          list.add("全职");
          flg = true;
        }
        if (body.get("实习") != null && Boolean.valueOf(body.get("实习").toString())) {
          if (flg) {
            category += " or ";
          }
          category += " category = ? ";
          list.add("实习");
          flg = true;
        }
        if (flg) {
          sql += "and ( " + category + " )";
        }
        if (body.get("status") != null && !"".equals(body.get("status").toString())) {
          sql += " and status=?";
          list.add(body.get("status").toString());
        }
      }

      logger.info(sql);
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
    RecruitmentReply reply = RecruitmentReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void enterpriseList(RecruitmentRequest req, StreamObserver<RecruitmentReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from recruitment where enterprise_id = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("id").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecruitmentReply reply = RecruitmentReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void enterpriseSearch(RecruitmentRequest req, StreamObserver<RecruitmentReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");

    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from recruitment where enterprise_id = ?";
      List<String> list = new ArrayList<>();
      list.add(body.get("enterprise_id").toString());
      if (body.get("name") != null && !"".equals(body.get("name").toString())) {
        sql += " and name = ? ";
        list.add(body.get("name").toString());
      }
      if (body.get("category") != null && !"".equals(body.get("category").toString())) {
        sql += " and category = ? ";
        list.add(body.get("category").toString());
      }
      if (body.get("date") != null && !"".equals(body.get("date").toString())) {
        sql += " and date = ? ";
        list.add(body.get("date").toString());
      }
      if (body.get("status") != null && !"".equals(body.get("status").toString())) {
        sql += " and status = ? ";
        list.add(body.get("status").toString());
      }
      if (body.get("education") != null && !"".equals(body.get("education").toString())) {
        sql += " and education = ? ";
        list.add(body.get("education").toString());
      }
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
    RecruitmentReply reply = RecruitmentReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
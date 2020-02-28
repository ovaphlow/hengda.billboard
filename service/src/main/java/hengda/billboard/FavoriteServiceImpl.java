package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
public class FavoriteServiceImpl extends FavoriteGrpc.FavoriteImplBase {

  private static final Logger logger = LoggerFactory.getLogger(FavoriteServiceImpl.class);

  @Override
  public void list(FavoriteRequest req, StreamObserver<FavoriteReply> responseObserver) {
    logger.info("FavoriteServiceImpl.list");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select r.id, r.name, r.address1, r.address2, r.address3, r.qty, r.salary1, r.salary2, r.date, t.category,\n"
          + "   (select name from enterprise) as enterprise_name from "
          + "(select data_id, category from favorite where category1 = ? and category2 = '岗位'  and user_id =?) as t "
          + "join recruitment as r on data_id = r.id";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("category1").toString());
      ps.setString(2, body.get("user_id").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FavoriteReply reply = FavoriteReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void searchOne(FavoriteRequest req, StreamObserver<FavoriteReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from favorite where user_id = ? and data_id = ? and category1 = ? and category2 = ? limit 1";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("user_id").toString());
      ps.setString(2, body.get("data_id").toString());
      ps.setString(3, body.get("category1").toString());
      ps.setString(4, body.get("category2").toString());
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
    FavoriteReply reply = FavoriteReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void searchResume(FavoriteRequest req, StreamObserver<FavoriteReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select f.id, r.id as resume_id, r.name, r.education, r.school,"
          + "r.yixiangchengshi, r.qiwanghangye,  r.qiwangzhiwei from "
          + "favorite f left join resume r on f.data_id = r.id " 
          + "where f.category1 = '企业用户' and f.category2 = '简历' and user_id = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("user_id").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FavoriteReply reply = FavoriteReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void delete(FavoriteRequest req, StreamObserver<FavoriteReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "delete from favorite where id = ? limit 1";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("id").toString());
      ps.execute();
      resp.put("content", true);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FavoriteReply reply = FavoriteReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insert(FavoriteRequest req, StreamObserver<FavoriteReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "insert into favorite " + "(user_id, data_id, category1, category2, datime)"
          + "value (?, ?, ?, ?, ?)";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("user_id").toString());
      ps.setString(2, body.get("data_id").toString());
      ps.setString(3, body.get("category1").toString());
      ps.setString(4, body.get("category2").toString());
      ps.setString(5, new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
      ps.execute();
      resp.put("content", true);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FavoriteReply reply = FavoriteReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
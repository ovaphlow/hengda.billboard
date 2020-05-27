package hengda.billboard;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import io.grpc.stub.StreamObserver;

@SuppressWarnings("unchecked")
class RecommendServiceImpl extends RecommendGrpc.RecommendImplBase {

  @Override
  public void list(RecommendRequest req, StreamObserver<RecommendReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select id, uuid, category, title,  address_level1, address_level2, publisher, qty from recommend where now() between date1 and date2 ";
      List<String> list = new ArrayList<>();
      if (body.keySet().size() != 0) {
        boolean flg = false;
        String category = "";
        if (body.get("国企") != null && Boolean.valueOf(body.get("国企").toString())) {
          category += " category = ? ";
          list.add("国企");
          flg = true;
        }
        if (body.get("公务员") != null && Boolean.valueOf(body.get("公务员").toString())) {
          if (flg) {
            category += " or ";
          }
          category += "category = ? ";
          list.add("公务员");
          flg = true;
        }
        if (body.get("事业单位") != null && Boolean.valueOf(body.get("事业单位").toString())) {
          if (flg) {
            category += " or ";
          }
          category += " category = ? ";
          list.add("事业单位");
          flg = true;
        }
        if (body.get("教师") != null && Boolean.valueOf(body.get("教师").toString())) {
          if (flg) {
            category += " or ";
          }
          category += " category = ? ";
          list.add("教师");
          flg = true;
        }
        if (flg) {
          sql += "and ( " + category + " ) ";
        }
      }
      try (PreparedStatement ps = conn.prepareStatement(sql + " ORDER BY date2 limit 100")) {
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
    RecommendReply reply = RecommendReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void get(RecommendRequest req, StreamObserver<RecommendReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select * from recommend where id = ? and uuid = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("id").toString());
        ps.setString(2, body.get("uuid").toString());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result.get(0));
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecommendReply reply = RecommendReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
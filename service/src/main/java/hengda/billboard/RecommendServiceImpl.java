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

class RecommendServiceImpl extends RecommendGrpc.RecommendImplBase {

  @Override
  public void list(RecommendProto.ListRequest req, StreamObserver<RecommendProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select id, uuid, category, title,  address_level1, address_level2, publisher, qty from recommend where now() between date1 and date2 ";
      List<String> list = new ArrayList<>();
      boolean flg = false;
      String category = "";
      if (req.getCategory1()) {
        category += " category = ? ";
        list.add("国企");
        flg = true;
      }
      if (req.getCategory2()) {
        if (flg) {
          category += " or ";
        }
        category += "category = ? ";
        list.add("公务员");
        flg = true;
      }
      if (req.getCategory3()) {
        if (flg) {
          category += " or ";
        }
        category += " category = ? ";
        list.add("事业单位");
        flg = true;
      }
      if (req.getCategory4()) {
        if (flg) {
          category += " or ";
        }
        category += " category = ? ";
        list.add("教师");
        flg = true;
      }
      if (req.getCategory5()) {
        if (flg) {
          category += " or ";
        }
        category += " category = ? ";
        list.add("其它");
        flg = true;
      }
      if (flg) {
        sql += "and ( " + category + " ) ";
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
    RecommendProto.Reply reply = RecommendProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void get(RecommendProto.GetRequest req, StreamObserver<RecommendProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from recommend where id = ? and uuid = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setString(2, req.getUuid());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result.get(0));
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecommendProto.Reply reply = RecommendProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
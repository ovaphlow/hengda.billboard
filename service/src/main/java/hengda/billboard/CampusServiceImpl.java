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

public class CampusServiceImpl extends CampusGrpc.CampusImplBase {

  @Override
  public void get(CampusProto.GetRequest req, StreamObserver<CampusProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from campus where id = ? and uuid = ? ";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setString(2, req.getUuid());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        if (result.size() > 0) {
          resp.put("content", result.get(0));
        } else {
          resp.put("message", "该信息已失效");
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CampusProto.Reply reply = CampusProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void search(CampusProto.SearchRequest req, StreamObserver<CampusProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select id, uuid, title, address_level3, address_level2, date, school, category from campus where date >= curdate() ";
      List<String> list = new ArrayList<>();
      if (req.getCity() != null && !"".equals(req.getCity())) {
        sql += "and address_level2 = ? ";
        list.add(req.getCity());
      }

      if (req.getCity() != null && !"".equals(req.getCity())) {
        sql += "and address_level2 = ? ";
        list.add(req.getCity());
      }

      boolean flg = false;
      String category = "";
      if (req.getCategory1()) {
        category += " category = ? ";
        list.add("宣讲会");
        flg = true;
      }
      if (req.getCategory2()) {
        if (flg) {
          category += " or ";
        }
        category += "category = ? ";
        list.add("双选会");
        flg = true;
      }

      if (flg) {
        sql += "and ( " + category + " )";
      }
      sql += "ORDER BY date";
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
    CampusProto.Reply reply = CampusProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
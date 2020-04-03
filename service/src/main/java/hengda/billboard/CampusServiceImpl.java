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
public class CampusServiceImpl extends CampusGrpc.CampusImplBase {

  @Override
  public void get(CampusRequest req, StreamObserver<CampusReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select * from campus where id = ? and uuid = ? ";
      Connection conn = DBUtil.getConn();
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("id").toString());
      ps.setString(2, body.get("uuid").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size()>0) {
        resp.put("content", result.get(0));
      } else {
        resp.put("message", "该信息已失效");
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CampusReply reply = CampusReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void search(CampusRequest req, StreamObserver<CampusReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select id, uuid, title, address_level3, date, school, category from campus where 1=1 ";
      List<String> list = new ArrayList<>();
      
      if (body.get("city")!=null &&  !"".equals(body.get("city").toString())) {
        sql += "and address_level3 = ? ";
        list.add(body.get("city").toString());
      }


      if (body.get("city")!=null &&  !"".equals(body.get("city").toString())) {
        sql += "and address_level3 = ? ";
        list.add(body.get("city").toString());
      }

      boolean flg = false;
      String category = "";
      if (body.get("宣讲会") != null && Boolean.valueOf(body.get("宣讲会").toString())) {
        category += " category = ? ";
        list.add("宣讲会");
        flg = true;
      }
      if (body.get("双选会") != null && Boolean.valueOf(body.get("双选会").toString())) {
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

      Connection conn = DBUtil.getConn();
      PreparedStatement ps = conn.prepareStatement(sql);
      for(int inx=0; inx<list.size(); inx++) {
        ps.setString(inx+1, list.get(inx));
      }
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CampusReply reply = CampusReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
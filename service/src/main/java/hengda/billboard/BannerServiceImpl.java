package hengda.billboard;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import io.grpc.stub.StreamObserver;

@SuppressWarnings("unchecked")
public class BannerServiceImpl extends BannerGrpc.BannerImplBase {


  @Override
  public void get(BannerRequest req, StreamObserver<BannerReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from banner where category = ? and status = '启用'";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("category").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    BannerReply reply = BannerReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }


}
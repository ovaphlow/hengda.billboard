package hengda.billboard;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import com.google.gson.Gson;

import io.grpc.stub.StreamObserver;

public class BannerServiceImpl extends BannerGrpc.BannerImplBase {

  @Override
  public void get(BannerProto.GetRequest req, StreamObserver<BannerProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select id, uuid,datime,data_url,source_url category from banner where category = ? and status = '启用'";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getCategory());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    responseObserver.onNext(BannerProto.Reply.newBuilder().setData(gson.toJson(resp)).build());
    responseObserver.onCompleted();
  }

  @Override
  public void detail(BannerProto.DetailRequest req, StreamObserver<BannerProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from banner where id = ? and uuid = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setString(2, req.getUuid());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        if (result.size() == 0) {
          resp.put("message", "未找到该内容");
        } else {
          resp.put("content", result.get(0));
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    responseObserver.onNext(BannerProto.Reply.newBuilder().setData(gson.toJson(resp)).build());
    responseObserver.onCompleted();
  }

}
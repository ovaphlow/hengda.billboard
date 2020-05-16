package hengda.billboard;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import io.grpc.stub.StreamObserver;

// @SuppressWarnings("unchecked")
public class CommonDataImpl extends CommonDataGrpc.CommonDataImplBase {

  @Override
  public void hangye(CommonDataRequest req, StreamObserver<CommonDataReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from common_data where  category='行业'";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    CommonDataReply reply = CommonDataReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
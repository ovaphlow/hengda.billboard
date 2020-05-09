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
public class ChartServiceImpl extends ChartGrpc.ChartImplBase {

  @Override
  public void entHome(ChartRequest req, StreamObserver<ChartReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      String sql = "select zhiwei, count(zhiwei) as count from (select CONCAT(qiwanghangye,'-',qiwangzhiwei) as zhiwei  "
      +"from resume ) as t GROUP BY zhiwei ORDER BY count DESC limit 5";
      Connection conn = DBUtil.getConn();
      PreparedStatement ps = conn.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    ChartReply reply = ChartReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }



}
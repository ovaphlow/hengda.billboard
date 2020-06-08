package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DemoServiceImpl extends DemoGrpc.DemoImplBase {
  private static final Logger logger = LoggerFactory.getLogger(DemoServiceImpl.class);

  @Override
  public void test(DemoProto.DemoRequest req, StreamObserver<DemoProto.DemoReply> responseObserver) {
    logger.info("test");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    System.out.println(req.getItem1());
    System.out.println(req.getItem2());
    try (Connection conn = DBUtil.getConn()) {
      String sql = "show tables";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    DemoProto.DemoReply reply = DemoProto.DemoReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }
}

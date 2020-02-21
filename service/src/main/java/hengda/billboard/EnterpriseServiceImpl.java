package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
public class EnterpriseServiceImpl extends EnterpriseGrpc.EnterpriseImplBase {

  //private static final Logger logger = LoggerFactory.getLogger(EnterpriseServiceImpl.class);

  @Override
  public void get(EnterpriseRequest req, StreamObserver<EnterpriseReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from enterprise where id=?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("id").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size() == 0) {
        resp.put("message", "该企业已不存在");
      } else {
        resp.put("content", result.get(0));
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseReply reply = EnterpriseReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }
}
package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("unchecked")
public class FeedbackServiceImpl extends FeedbackGrpc.FeedbackImplBase {

  private static Logger logger = LoggerFactory.getLogger(FeedbackServiceImpl.class);

  @Override
  public void insert(FeedbackRequest req, StreamObserver<FeedbackReply> responseObserver) {
    ;
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    logger.info(req.getData());
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "insert into feedback (common_user_id, content, datime) value (?, ?, ?)";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("common_user_id").toString());
      ps.setString(2, body.get("content").toString());
      ps.setString(3, body.get("datime").toString());
      ps.execute();
      resp.put("content", true);
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FeedbackReply reply = FeedbackReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
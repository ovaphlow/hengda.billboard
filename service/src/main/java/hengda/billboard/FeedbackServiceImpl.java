package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@SuppressWarnings("unchecked")
public class FeedbackServiceImpl extends FeedbackGrpc.FeedbackImplBase {

  private static Logger logger = LoggerFactory.getLogger(FeedbackServiceImpl.class);

  @Override
  public void insert(FeedbackRequest req, StreamObserver<FeedbackReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "insert into feedback (user_id, user_uuid, user_category, content, datime, category, status) value (?, ?, ?, ?, ?, ?, '未处理')";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("user_id").toString());
        ps.setString(2, body.get("user_uuid").toString());
        ps.setString(3, body.get("user_category").toString());
        ps.setString(4, body.get("content").toString());
        ps.setString(5, body.get("datime").toString());
        ps.setString(6, body.get("category").toString());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FeedbackReply reply = FeedbackReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void list(FeedbackRequest req, StreamObserver<FeedbackReply> responseObserver) {
    logger.info("FeedbackServiceImpl.list");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select * from feedback where user_id = ? and user_category = ? ORDER BY datime DESC ";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("user_id").toString());
        ps.setString(2, body.get("user_category").toString());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FeedbackReply reply = FeedbackReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
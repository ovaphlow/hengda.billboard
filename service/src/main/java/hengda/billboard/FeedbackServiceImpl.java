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

public class FeedbackServiceImpl extends FeedbackGrpc.FeedbackImplBase {

  private static Logger logger = LoggerFactory.getLogger(FeedbackServiceImpl.class);

  @Override
  public void insert(FeedbackProto.InsertRequest req, StreamObserver<FeedbackProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "insert into feedback (user_id, user_uuid, user_category, content, datime, category, status) value (?, ?, ?, ?, ?, ?, '未处理')";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getUserId());
        ps.setString(2, req.getUserUuid());
        ps.setString(3, req.getUserCategory());
        ps.setString(4, req.getContent());
        ps.setString(5, req.getDatime());
        ps.setString(6, req.getCategory());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FeedbackProto.Reply reply = FeedbackProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void list(FeedbackProto.ListRequest req, StreamObserver<FeedbackProto.Reply> responseObserver) {
    logger.info("FeedbackServiceImpl.list");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from feedback where user_id = ? and user_category = ? ORDER BY datime DESC ";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getUserId());
        ps.setString(2, req.getUserCategory());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FeedbackProto.Reply reply = FeedbackProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
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

@SuppressWarnings("unchecked")
public class ReportServiceImpl extends ReportGrpc.ReportImplBase {

  private static Logger logger = LoggerFactory.getLogger(ReportServiceImpl.class);

  @Override
  public void insert(ReportRequest req, StreamObserver<ReportReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    logger.info(req.getData());
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "insert into report (user_id, user_category, data_id, category, content, datime)  value (?, ?, ?, ?, ?, ?)";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, body.get("user_id").toString());
        ps.setString(2, body.get("user_category").toString());
        ps.setString(3, body.get("data_id").toString());
        ps.setString(4, body.get("category").toString());
        ps.setString(5, body.get("content").toString());
        ps.setString(6, body.get("datime").toString());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    ReportReply reply = ReportReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void list(ReportRequest req, StreamObserver<ReportReply> responseObserver) {
    logger.info("ReportServiceImpl.list");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      String sql = "select*, (case category " + "    when '岗位' then (select name from recruitment where id = data_id) "
          + " when '企业' then  (select name from enterprise where id = data_id) "
          + " when '简历' then (select name from resume where id = data_id) "
          + " end ) as name from report where user_id=? and user_category=?  ORDER BY datime desc";
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
    ReportReply reply = ReportReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
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

public class ReportServiceImpl extends ReportGrpc.ReportImplBase {

  private static Logger logger = LoggerFactory.getLogger(ReportServiceImpl.class);

  @Override
  public void insert(ReportProto.InsertRequest req, StreamObserver<ReportProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "insert into report (user_id, user_uuid, user_category, data_id, data_uuid, category, content, datime)  value (?, ?, ?, ?, ?, ?, ?, ?)";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getUserId());
        ps.setString(2, req.getUserUuid());
        ps.setString(3, req.getUserCategory());
        ps.setInt(4, req.getDataId());
        ps.setString(5, req.getDataUuid());
        ps.setString(6, req.getCategory());
        ps.setString(7, req.getContent());
        ps.setString(8, req.getDatime());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    ReportProto.Reply reply = ReportProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void list(ReportProto.ListRequest req, StreamObserver<ReportProto.Reply> responseObserver) {
    logger.info("ReportServiceImpl.list");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select*, (case category " + "    when '岗位' then (select name from recruitment where id = data_id) "
          + " when '企业' then  (select name from enterprise where id = data_id) "
          + " when '简历' then (select name from resume where id = data_id) "
          + " end ) as name from report where user_id=? and user_category=?  ORDER BY datime desc";
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
    ReportProto.Reply reply = ReportProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
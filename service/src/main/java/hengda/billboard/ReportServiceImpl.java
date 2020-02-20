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
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "insert into report (common_user_id, data_id, category, content, datime)  value (?, ?, ?, ?, ?)";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("common_user_id").toString());
      ps.setString(2, body.get("data_id").toString());
      ps.setString(3, body.get("category").toString());
      ps.setString(4, body.get("content").toString());
      ps.setString(5, body.get("datime").toString());
      ps.execute();
      resp.put("content", true);
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
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from (\n" +
      "                  (select t.*, r.name as name\n" +
      "                   from (\n" +
      "                            select *\n" +
      "                            from report\n" +
      "                            where common_user_id = ? and category = '岗位'\n" +
      "                        ) as t\n" +
      "                            left join recruitment r on t.data_id = r.id)\n" +
      "                  UNION all\n" +
      "                  (select t.*, e.name as name\n" +
      "                   from (\n" +
      "                            select *\n" +
      "                            from report\n" +
      "                            where common_user_id = ? and category = '企业'\n" +
      "                        ) as t\n" +
      "                            left join enterprise e on t.data_id = e.id)\n" +
      "              ) as tab ORDER BY datime desc";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("common_user_id").toString());
      ps.setString(2, body.get("common_user_id").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    ReportReply reply = ReportReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
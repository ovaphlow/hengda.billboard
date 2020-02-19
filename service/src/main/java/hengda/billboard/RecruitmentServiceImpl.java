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
public class RecruitmentServiceImpl extends RecruitmentGrpc.RecruitmentImplBase {
  
  private static final Logger logger = LoggerFactory.getLogger(RecruitmentServiceImpl.class);

  @Override
  public void list(RecruitmentRequest req, StreamObserver<RecruitmentReply> responseObserver) {
    logger.info("RecruitmentServiceImpl.list");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      
      Connection conn = DBUtil.getConn();
      String sql = "select * from recruitment";
      PreparedStatement ps = conn.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecruitmentReply reply = RecruitmentReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void get(RecruitmentRequest req, StreamObserver<RecruitmentReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select *, (select e.name from enterprise e where e.id=enterprise_id) as enterprise_name from recruitment where id = ?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("id").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      if (result.size() == 0) {
        resp.put("content", false);
      } else {
        resp.put("content", result.get(0));
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecruitmentReply reply = RecruitmentReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
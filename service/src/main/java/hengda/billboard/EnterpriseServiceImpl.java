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

  // private static final Logger logger =
  // LoggerFactory.getLogger(EnterpriseServiceImpl.class);

  @Override
  public void get(EnterpriseRequest req, StreamObserver<EnterpriseReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select e.*,u.id as ent_user_id from enterprise e "+ 
      "left join enterprise_user u on e.id = u.enterprise_id  where e.id = ? and (u.uuid=? or e.uuid=?)  ";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("id").toString());
      ps.setString(2, body.get("uuid").toString());
      ps.setString(3, body.get("uuid").toString());
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

  @Override
  public void update(EnterpriseRequest req, StreamObserver<EnterpriseReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "update enterprise set yingyezhizhao = ?, faren= ?, zhuceriqi= ?, zhuziguimo= ?, "
          + "yuangongshuliang= ?, yingyezhizhao_tu= ?, address1= ?, address2= ?, address3= ?, address4= ? where id=? and uuid=?";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("yingyezhizhao").toString());
      ps.setString(2, body.get("faren").toString());
      ps.setString(3, body.get("zhuceriqi").toString());
      ps.setString(4, body.get("zhuziguimo").toString());
      ps.setString(5, body.get("yuangongshuliang").toString());
      ps.setString(6, body.get("yingyezhizhao_tu").toString());
      ps.setString(7, body.get("address1").toString());
      ps.setString(8, body.get("address2").toString());
      ps.setString(9, body.get("address3").toString());
      ps.setString(10, body.get("address4").toString());
      ps.setString(11, body.get("id").toString());
      ps.setString(12, body.get("uuid").toString());
      ps.execute();
      resp.put("content", true);
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
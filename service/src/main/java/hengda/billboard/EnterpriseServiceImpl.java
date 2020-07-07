package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EnterpriseServiceImpl extends EnterpriseGrpc.EnterpriseImplBase {

  // private static final Logger logger =
  // LoggerFactory.getLogger(EnterpriseServiceImpl.class);

  @Override
  public void get(EnterpriseProto.GetRequest req, StreamObserver<EnterpriseProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select e.*,u.id as ent_user_id from enterprise e "
          + "left join enterprise_user u on e.id = u.enterprise_id  where e.id = ? and (u.uuid=? or e.uuid=?)  ";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setString(2, req.getUuid());
        ps.setString(3, req.getUuid());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        if (result.size() == 0) {
          resp.put("message", "该企业已不存在");
        } else {
          resp.put("content", result.get(0));
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseProto.Reply reply = EnterpriseProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void check(EnterpriseProto.CheckRequest req, StreamObserver<EnterpriseProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select status from enterprise where id = ? and uuid = ?  and status = '认证'";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setString(2, req.getUuid());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        if (result.size() == 0) {
          resp.put("content", false);
        } else {
          resp.put("content", true);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseProto.Reply reply = EnterpriseProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void update(EnterpriseProto.UpdateRequest req, StreamObserver<EnterpriseProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "update enterprise set yingyezhizhao = ?, faren= ?, zhuceriqi= ?, zhuziguimo= ?, "
          + "yuangongshuliang= ?, yingyezhizhao_tu= ?, phone=?, address1= ?, address2= ?, address3= ?, "+
          " address4= ?, industry= ?, intro= ?, url= ? ,status ='待认证'  where id=? and uuid=?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getYingyezhizhao());
        ps.setString(2, req.getFaren());
        ps.setString(3, req.getZhuceriqi());
        ps.setString(4, req.getZhuziguimo());
        ps.setString(5, req.getYuangongshuliang());
        ps.setString(6, req.getYingyezhizhaoTu());
        ps.setString(7, req.getPhone());
        ps.setString(8, req.getAddress1());
        ps.setString(9, req.getAddress2());
        ps.setString(10, req.getAddress3());
        ps.setString(11, req.getAddress4());
        ps.setString(12, req.getIndustry());
        ps.setString(13, req.getIntro());
        ps.setString(14, req.getUrl());
        ps.setInt(15, req.getId());
        ps.setString(16, req.getUuid());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseProto.Reply reply = EnterpriseProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override 
  public void subject(EnterpriseProto.SubjectRequest req, StreamObserver<EnterpriseProto.Reply> responseObserver){
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    String sql = "select id,uuid,name from enterprise where subject = ?";
    try (Connection conn = DBUtil.getConn()) {
      try(PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getName());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    EnterpriseProto.Reply reply = EnterpriseProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }
}
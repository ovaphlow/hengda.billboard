package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FavoriteServiceImpl extends FavoriteGrpc.FavoriteImplBase {

  private static final Logger logger = LoggerFactory.getLogger(FavoriteServiceImpl.class);

  @Override
  public void list(FavoriteProto.ListRequest req, StreamObserver<FavoriteProto.Reply> responseObserver) {
    logger.info("FavoriteServiceImpl.list");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select r.id, r.uuid, r.name, r.address1, r.address2, r.address3, r.qty, r.salary1, r.salary2, r.date, t.category2,(select name from enterprise where id = r.id)\n"
          + "as enterprise_name from (select data_id, category2 from favorite where category1 = ? and category2 = '岗位'  and user_id =?) as t  join recruitment as r on data_id = r.id\n"
          + "union\n"
          + "select  c.id, c.uuid, c.title,  c.address_level1, c.address_level2, c.address_level3, '', '', '', c.date,   t.category2, c.school as enterprise_name from\n"
          + "(select data_id, category2 from favorite where category1 = ? and category2 = '校园招聘'  and user_id =? ) as t join campus as c on data_id = c.id\n"
          + "union\n"
          + "select  re.id, re.uuid, re.title, re.address_level1, re.address_level2, '', re.qty, '', '', re.date1,   t.category2, re.publisher as enterprise_name from\n"
          + "(select data_id, category2 from favorite where category1 = ? and category2 = '推荐信息'  and user_id =? ) as t join recommend as re on data_id = re.id";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getCategory1());
        ps.setInt(2, req.getUserId());
        ps.setString(3, req.getCategory1());
        ps.setInt(4, req.getUserId());
        ps.setString(5, req.getCategory1());
        ps.setInt(6, req.getUserId());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FavoriteProto.Reply reply = FavoriteProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void searchOne(FavoriteProto.SearchOneRequest req, StreamObserver<FavoriteProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from favorite where user_id = ? and data_id = ? and category1 = ? and category2 = ? limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getUserId());
        ps.setInt(2, req.getDataId());
        ps.setString(3, req.getCategory1());
        ps.setString(4, req.getCategory2());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        if (result.size() == 0) {
          resp.put("content", false);
        } else {
          resp.put("content", result.get(0));
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FavoriteProto.Reply reply = FavoriteProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void searchResume(FavoriteProto.SearchResumeRequest req, StreamObserver<FavoriteProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select f.id, r.id as resume_id, r.uuid, r.name, r.education, r.school,"
          + "r.yixiangchengshi, r.qiwanghangye,  r.qiwangzhiwei from "
          + "favorite f left join resume r on f.data_id = r.id "
          + "where f.category1 = '企业用户' and f.category2 = '简历' and user_id = ?";
      List<String> list = new ArrayList<>();
      list.add(req.getUserId());
      if (req.getName() != null && !"".equals(req.getName())) {
        sql += " and r.name like CONCAT(?,'%') ";
        list.add(req.getName());
      }
      if (req.getQiwanghangye() != null && !"".equals(req.getQiwanghangye())) {
        sql += " and r.qiwanghangye like CONCAT(?,'%') ";
        list.add(req.getQiwanghangye());
      }
      if (req.getQiwangzhiwei() != null && !"".equals(req.getQiwangzhiwei())) {
        sql += " and r.qiwangzhiwei like CONCAT(?,'%') ";
        list.add(req.getQiwangzhiwei());
      }
      if (req.getYixiangchengshi() != null && !"".equals(req.getYixiangchengshi())) {
        sql += " and r.yixiangchengshi like CONCAT(?,'%') ";
        list.add(req.getYixiangchengshi());
      }
      if (req.getEducation() != null && !"".equals(req.getEducation())) {
        sql += " and r.education = ? ";
        list.add(req.getEducation());
      }
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        for (int inx = 0; inx < list.size(); inx++) {
          ps.setString(inx + 1, list.get(inx));
        }
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FavoriteProto.Reply reply = FavoriteProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void delete(FavoriteProto.DeleteRequest req, StreamObserver<FavoriteProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "delete from favorite where id = ? limit 1";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FavoriteProto.Reply reply = FavoriteProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insert(FavoriteProto.InsertRequest req, StreamObserver<FavoriteProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "insert into favorite (user_id, user_uuid, data_id, data_uuid, category1, category2, datime) value (?, ?, ?, ?, ?, ?, ?)";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getUserId());
        ps.setString(2, req.getUserUuid());
        ps.setInt(3, req.getDataId());
        ps.setString(4, req.getDataUuid());
        ps.setString(5, req.getCategory1());
        ps.setString(6, req.getCategory2());
        ps.setString(7, new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    FavoriteProto.Reply reply = FavoriteProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
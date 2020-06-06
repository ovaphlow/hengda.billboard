package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class RecruitmentServiceImpl extends RecruitmentGrpc.RecruitmentImplBase {

  private static final Logger logger = LoggerFactory.getLogger(RecruitmentServiceImpl.class);

  @Override
  public void list(RecruitmentProto.ListRequest req ,StreamObserver<RecruitmentProto.Reply> responseObserver) {
    logger.info("RecruitmentServiceImpl.list");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from recruitment";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecruitmentProto.Reply reply = RecruitmentProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void insert(RecruitmentProto.InsertRequest req, StreamObserver<RecruitmentProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String uuid = UUID.randomUUID().toString();
      String sql = "insert into recruitment ( enterprise_id, enterprise_uuid, name, qty, description, requirement,"
          + "address1, address2, address3, date, salary1, salary2, education, category,"
          + " industry, position, uuid ) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,uuid())";
      try (PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
        ps.setInt(1, req.getEnterpriseId());
        ps.setString(2, req.getEnterpriseUuid());
        ps.setString(3, req.getName());
        ps.setString(4, req.getQty());
        ps.setString(5, req.getDescription());
        ps.setString(6, req.getRequirement());
        ps.setString(7, req.getAddress1());
        ps.setString(8, req.getAddress2());
        ps.setString(9, req.getAddress3());
        ps.setString(10, new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        ps.setString(11, req.getSalary1());
        ps.setString(12, req.getSalary2());
        ps.setString(13, req.getEducation());
        ps.setString(14, req.getCategory());
        ps.setString(15, req.getIndustry());
        ps.setString(16, req.getPosition());
        ps.setString(17, uuid);
        ps.executeUpdate();
        ResultSet rs = ps.getGeneratedKeys();
        if (rs.next()) {
          resp.put("content", Map.of("id", rs.getInt(1), "uuid", uuid) );
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecruitmentProto.Reply reply = RecruitmentProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void update(RecruitmentProto.UpdateRequest req, StreamObserver<RecruitmentProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "update recruitment set name = ?, qty = ?, description = ?,"
          + "requirement = ?, address1 = ?, address2 = ?, address3 = ?, salary1 = ?,"
          + "salary2 = ?, education = ?, category = ?,  industry = ?, position = ? where id = ? and uuid = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getName());
        ps.setString(2, req.getQty());
        ps.setString(3, req.getDescription());
        ps.setString(4, req.getRequirement());
        ps.setString(5, req.getAddress1());
        ps.setString(6, req.getAddress2());
        ps.setString(7, req.getAddress3());
        ps.setString(8, req.getSalary1());
        ps.setString(9, req.getSalary2());
        ps.setString(10, req.getEducation());
        ps.setString(11, req.getCategory());
        ps.setString(12, req.getIndustry());
        ps.setString(13, req.getPosition());
        ps.setInt(14, req.getId());
        ps.setString(15, req.getUuid());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecruitmentProto.Reply reply = RecruitmentProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void status(RecruitmentProto.StatusRequest req, StreamObserver<RecruitmentProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "update recruitment set status = ? where id = ? and uuid=?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, req.getStatus());
        ps.setInt(2, req.getId());
        ps.setString(3, req.getUuid());
        ps.execute();
        resp.put("content", true);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecruitmentProto.Reply reply = RecruitmentProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void get(RecruitmentProto.GetRequest req, StreamObserver<RecruitmentProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select r.*, e.name as enterprise_name, e.uuid as enterprise_uuid, u.id as ent_user_id\n"
          + "from recruitment r left join enterprise e on e.id=r.enterprise_id\n"
          + "left join enterprise_user u on u.enterprise_id = e.id\n" + "where r.id = ? and r.uuid = ?";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setString(2, req.getUuid());
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
    RecruitmentProto.Reply reply = RecruitmentProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void search(RecruitmentProto.SearchRequest req, StreamObserver<RecruitmentProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select id, enterprise_id, enterprise_uuid, name, qty, address1, address2, address3, date, "
      +" salary1, salary2,education, category, status, industry, position, uuid from recruitment where status='在招' ";
      List<String> list = new ArrayList<>();
      
        if (req.getCity() != null && !req.getCity().equals("")) {
          sql += " and (address1 = ? or  address2 = ?) ";
          list.add(req.getCity());
          list.add(req.getCity());
        }
        boolean flg = false;
        String category = "";
        if (req.getCategory1()) {
          category += " category = ? ";
          list.add("兼职");
          flg = true;
        }
        if (req.getCategory2()) {
          if (flg) {
            category += " or ";
          }
          category += "category = ? ";
          list.add("全职");
          flg = true;
        }
        if (req.getCategory3()) {
          if (flg) {
            category += " or ";
          }
          category += " category = ? ";
          list.add("实习");
          flg = true;
        }
        if (flg) {
          sql += "and ( " + category + " )";
        }
      sql+=" ORDER BY date DESC";
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
    RecruitmentProto.Reply reply = RecruitmentProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }


  @Override
  public void keywordSearch(RecruitmentProto.KeywordSearchRequest req, StreamObserver<RecruitmentProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from recruitment where status='在招' and (POSITION(? in name) or enterprise_id in (select id from enterprise where POSITION(? in name) ))";
      List<String> list = new ArrayList<>();
      list.add(req.getKeyword());
      list.add(req.getKeyword());
        if (req.getCity() != null && !req.getCity().equals("")) {
          sql += " and (address1 = ? or  address2 = ?) ";
          list.add(req.getCity());
          list.add(req.getCity());
        }
        boolean flg = false;
        String category = "";
        if (req.getCategory1()) {
          category += " category = ? ";
          list.add("兼职");
          flg = true;
        }
        if (req.getCategory2()) {
          if (flg) {
            category += " or ";
          }
          category += "category = ? ";
          list.add("全职");
          flg = true;
        }
        if (req.getCategory3()) {
          if (flg) {
            category += " or ";
          }
          category += " category = ? ";
          list.add("实习");
          flg = true;
        }
        if (flg) {
          sql += "and ( " + category + " )";
        }
      sql+=" ORDER BY date DESC";
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
    RecruitmentProto.Reply reply = RecruitmentProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void enterpriseList(RecruitmentProto.EnterpriseListRequest req, StreamObserver<RecruitmentProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select * from recruitment where enterprise_id = ? and "
          + "(select uuid from enterprise where id = enterprise_id ) = ? and status = '在招' ORDER BY date DESC";
      try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, req.getId());
        ps.setString(2, req.getUuid());
        ResultSet rs = ps.executeQuery();
        List<Map<String, Object>> result = DBUtil.getList(rs);
        resp.put("content", result);
      }
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    RecruitmentProto.Reply reply = RecruitmentProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void enterpriseSearch(RecruitmentProto.EnterpriseSearchRequest req, StreamObserver<RecruitmentProto.Reply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try (Connection conn = DBUtil.getConn()) {
      String sql = "select id, enterprise_id, enterprise_uuid, name, qty, address1, address2, address3, date, salary1, salary2, education, category, status, industry, position, uuid,"
      +"(select count(*) from browse_journal where data_id=recruitment.id and data_uuid = recruitment.uuid ) as journal,"
      +"(select count(*) from delivery where recruitment_id=recruitment.id and recruitment_uuid = recruitment.uuid ) as delivery from recruitment where enterprise_id = ? and enterprise_uuid = ? ";
      List<String> list = new ArrayList<>();
      list.add(req.getEnterpriseId());
      list.add(req.getUuid());
      if (req.getName() != null && !"".equals(req.getName())) {
        sql += " and name = ? ";
        list.add(req.getName());
      }
      if (req.getCategory() != null && !"".equals(req.getCategory())) {
        sql += " and category = ? ";
        list.add(req.getCategory());
      }
      if (req.getDate() != null && !"".equals(req.getDate())) {
        sql += " and date = ? ";
        list.add(req.getDate());
      }
      if (req.getStatus() != null && !"".equals(req.getStatus())) {
        sql += " and status = ? ";
        list.add(req.getStatus());
      }
      if (req.getEducation()  != null && !"".equals(req.getEducation())) {
        sql += " and education = ? ";
        list.add(req.getEducation());
      }
      sql+=" ORDER BY date DESC";
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
    RecruitmentProto.Reply reply = RecruitmentProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
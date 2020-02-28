package hengda.billboard;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
public class MessageServiceImpl extends MessageGrpc.MessageImplBase {

  private static final Logger logger = LoggerFactory.getLogger(MessageServiceImpl.class);

  @Override
  public void insert(MessageRequest req, StreamObserver<MessageReply> responseObserver) {
    logger.info("FavoriteServiceImpl.list");
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {
      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "insert into message" + " (category, send_user_id, send_category,"
          + " receive_user_id, receive_category, content, datime)" + " value (?,?,?,?,?,?,?) ";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("category").toString());
      ps.setString(2, body.get("send_user_id").toString());
      ps.setString(3, body.get("send_category").toString());
      ps.setString(4, body.get("receive_user_id").toString());
      ps.setString(5, body.get("receive_category").toString());
      ps.setString(6, body.get("content").toString());
      ps.setString(7, new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
      ps.execute();
      resp.put("content", true);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageReply reply = MessageReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }


  @Override
  public void messageContent(MessageRequest req, StreamObserver<MessageReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql = "select * from message m where "+
            " (m.send_category = ? and m.send_user_id = ? and"+
            " m.receive_category = ? and m.receive_user_id = ?) or"+
            " (m.send_category = ? and m.send_user_id = ? and"+
            " m.receive_category = ? and m.receive_user_id = ?)"+
            " order by datime";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("user1_category").toString());
      ps.setString(2, body.get("user1_id").toString());
      ps.setString(3, body.get("user2_category").toString());
      ps.setString(4, body.get("user2_id").toString());
      ps.setString(5, body.get("user1_category").toString());
      ps.setString(6, body.get("user1_id").toString());
      ps.setString(7, body.get("user2_category").toString());
      ps.setString(8, body.get("user2_id").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageReply reply = MessageReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

  @Override
  public void messageList(MessageRequest req, StreamObserver<MessageReply> responseObserver) {
    Gson gson = new Gson();
    Map<String, Object> resp = new HashMap<>();
    resp.put("message", "");
    resp.put("content", "");
    try {

      Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
      Connection conn = DBUtil.getConn();
      String sql =
              "select\n" +
              "    *,\n" +
              "    case\n" +
              "    when user2_category = '企业用户' then (select name from enterprise_user where id=user2)\n" +
              "    when user2_category = '个人用户' then (select name from common_user where id=user2)\n" +
              "    else (select name from mis_user where id=user2)\n" +
              "    end  as user2_name,\n" +
              "    (select\n" +
              "        if(category = '消息',content,'面试邀请')\n" +
              "    from\n" +
              "        message m\n" +
              "    where\n" +
              "        (m.send_category = user1_category and m.send_user_id = user1 and\n" +
              "         m.receive_category = user2_category and m.receive_user_id = user2) or\n" +
              "        (m.send_category = user2_category and m.send_user_id = user2 and\n" +
              "         m.receive_category = user1_category and m.receive_user_id = user1)\n" +
              "    order by datime desc\n" +
              "    limit 1\n" +
              "    ) as content\n" +
              "from (\n" +
              "    select distinct * from (\n" +
              "        select if(send_user_id = ? and send_category = ?, send_user_id, receive_user_id) as user1,\n" +
              "             if(send_user_id = ? and send_category = ?, send_category,\n" +
              "                receive_category)  as user1_category,\n" +
              "             if(receive_user_id = ? and receive_category = ?, send_user_id,\n" +
              "                receive_user_id) as user2,\n" +
              "             if(receive_user_id = ? and receive_category = ?, send_category,\n" +
              "                receive_category) as user2_category\n" +
              "        from message\n" +
              "        where (send_category = ? and send_user_id = ?)\n" +
              "         or (receive_category = ? and receive_user_id = ?)\n" +
              "          and (category = '消息' or category = '面试邀请')\n" +
              "        order by datime desc\n" +
              "        ) as t\n" +
              "    ) as t2";
      PreparedStatement ps = conn.prepareStatement(sql);
      ps.setString(1, body.get("user_id").toString());
      ps.setString(2, body.get("user_category").toString());
      ps.setString(3, body.get("user_id").toString());
      ps.setString(4, body.get("user_category").toString());
      ps.setString(5, body.get("user_id").toString());
      ps.setString(6, body.get("user_category").toString());
      ps.setString(7, body.get("user_id").toString());
      ps.setString(8, body.get("user_category").toString());
      ps.setString(9, body.get("user_category").toString());
      ps.setString(10, body.get("user_id").toString());
      ps.setString(11, body.get("user_category").toString()); 
      ps.setString(12, body.get("user_id").toString());
      ResultSet rs = ps.executeQuery();
      List<Map<String, Object>> result = DBUtil.getList(rs);
      resp.put("content", result);
      conn.close();
    } catch (Exception e) {
      e.printStackTrace();
      resp.put("message", "gRPC服务器错误");
    }
    MessageReply reply = MessageReply.newBuilder().setData(gson.toJson(resp)).build();
    responseObserver.onNext(reply);
    responseObserver.onCompleted();
  }

}
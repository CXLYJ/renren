package io.renren.modules.sys.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;

@ServerEndpoint(value = "/webSocketServer/{userName}")
@Component
public class WebSocketServer {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private static final Set<WebSocketServer> connections = new CopyOnWriteArraySet<>();
    private String userName;
    private Session session;
    
    @OnOpen
    public void start(@PathParam("userName") String userName,Session session) {
        this.userName = userName;
        this.session = session;
        connections.add(this);
		logger.info("加入userName="+userName);
//        String message = "{\"error_code\":1,\"userName\":"+userName+"}";//加入
//        broadcast(message);
    }

    @OnClose
    public void end() {
        connections.remove(this);
		logger.info("退出userName="+userName);
//        String message = "{\"error_code\":2,\"userName\":"+userName+"}";//退出
//        broadcast(message);

    }

    @OnMessage
    public void pushMsg(String message) {
        broadcast(message);
    }

    public void onError(Throwable t) throws Throwable {
		logger.error("websocket onError="+t);
    }
    private void broadcast(String msg) {
		logger.info("message="+msg);
    	JSONObject jsonObj = JSONObject.fromObject(msg);
		String fromUserName = "";
		String toUserName = "";
		if (jsonObj.has("fromUserName")){
			fromUserName =jsonObj.getString("fromUserName");
    	}
		if (jsonObj.has("toUserName")){
			toUserName =jsonObj.getString("toUserName");
    	}
        for(WebSocketServer client : connections) {
            try {
                synchronized (client) {
                	if(msg ==null || msg ==""){
                		return;
                	}
                	if (jsonObj.has("error_code")){
                    	int error_code = Integer.valueOf(jsonObj.getString("error_code"));
                    	if(error_code == 0){
                        	String msg_id =jsonObj.getString("msg_id");
                    		if(msg_id.equalsIgnoreCase("SPEECH_SERVICE_TEXT_TO_VOICE_START")){
                    			if (client.userName.equalsIgnoreCase(toUserName)) {
                        			logger.info("开启文本转语音="+client.userName+",msg="+msg);
                    			}
                    		}else if(msg_id.equalsIgnoreCase("SPEECH_SERVICE_TEXT_TO_VOICE_STOP")){
                    			if (client.userName.equalsIgnoreCase(toUserName)) {
                        			logger.info("关闭文本转语音="+client.userName+",msg="+msg);
                    			}
                    		}else if(msg_id.equalsIgnoreCase("SPEECH_SERVICE_VOICE_TO_TEXT_START")){
                        		if (client.userName.equalsIgnoreCase(toUserName)) {
	                				if (jsonObj.has("result")){
	                        			String result =jsonObj.getString("result");
                                        Map<String,Object> map =new HashMap<String,Object>();
                                        map.put("error_code",3);
                                        map.put("msg_id","VOICE_TO_TEXT_START");
                                        map.put("result",result);
                                        map.put("fromUserName",fromUserName);
                                        map.put("toUserName",toUserName);
                            			client.session.getAsyncRemote().sendText(JSON.toJSONString(map));
                            			logger.info("开启语音转文本userName="+client.userName+",msg="+JSON.toJSONString(map));
                            		}
                    			}
                    		}else if(msg_id.equalsIgnoreCase("SPEECH_SERVICE_VOICE_TO_TEXT_STOP")){
                    			if (client.userName.equalsIgnoreCase(toUserName)) {
                        			logger.info("关闭语音转文本="+client.userName+",msg="+msg);
                    			}
                    		}else if(msg_id.equalsIgnoreCase("AUDIO_SERVICE_START_GET_DATA")){
                    			if (client.userName.equalsIgnoreCase(toUserName)) {
                        			logger.info("开始录音="+client.userName+",msg="+msg);
                    			}
                    		}else if(msg_id.equalsIgnoreCase("AUDIO_SERVICE_GET_DATA")){
                        		if (client.userName.equalsIgnoreCase(toUserName)) {
	                				if (jsonObj.has("data")){
	                					/*String data =jsonObj.getString("data");
                            			Map<String,Object> map =new HashMap<String,Object>();
                                        map.put("error_code",4);
                                        map.put("msg_id","AUDIO_SERVICE_START");
                                        map.put("data",data);
                                        map.put("fromUserName",fromUserName);
                                        map.put("toUserName",toUserName);
                            			client.session.getAsyncRemote().sendText(JSON.toJSONString(map));*/
                            			logger.info("获取音频="+client.userName+",msg="+msg);
                            		}
                    			}
                    		}else if(msg_id.equalsIgnoreCase("AUDIO_SERVICE_STOP_GET_DATA")){
                    			if (client.userName.equalsIgnoreCase(toUserName)) {
                        			logger.info("停止录音="+client.userName+",msg="+msg);
                    			}
                    		}else if(msg_id.equalsIgnoreCase("MECHINE_SERVICE_ACTION")){
                    			if (client.userName.equalsIgnoreCase(toUserName)) {
                        			logger.info("抬低头="+client.userName+",msg="+msg);
                    			}
                    		}else if(msg_id.equalsIgnoreCase("MECHINE_SERVICE_SHARE_SCREEN")){
                        		if (client.userName.equalsIgnoreCase(toUserName)) {
                        			Map<String,Object> map =new HashMap<String,Object>();
                                    map.put("error_code",5);
                                    map.put("msg_id","SHARE_SCREEN_START");
                                    map.put("fromUserName",fromUserName);
                                    map.put("toUserName",toUserName);
                        			client.session.getAsyncRemote().sendText(JSON.toJSONString(map));
                        			logger.info("开启同屏="+client.userName+",msg="+JSON.toJSONString(map));
                        		}
                    		}else if(msg_id.equalsIgnoreCase("MECHINE_SERVICE_SHARE_SCREEN_STOP")){
                    			if (client.userName.equalsIgnoreCase(toUserName)) {
                        			logger.info("关闭同屏="+client.userName+",msg="+msg);
                    			}
                    		}else if(msg_id.equalsIgnoreCase("MECHINE_SERVICE_SN")){
                    			if (client.userName.equalsIgnoreCase(toUserName)) {
                        			logger.info("获取sn="+client.userName+",msg="+msg);
                    			}
                    		}else if(msg_id.equalsIgnoreCase("CAMERA_SERVICE_START_GET_DATA")){
                    			if (client.userName.equalsIgnoreCase(toUserName)) {
                        			Map<String,Object> map =new HashMap<String,Object>();
                                    map.put("error_code",6);
                                    map.put("msg_id","CAMERA_SERVICE_START");
                                    map.put("fromUserName",fromUserName);
                                    map.put("toUserName",toUserName);
                        			client.session.getAsyncRemote().sendText(JSON.toJSONString(map));
                        			logger.info("开启摄像头="+client.userName+",msg="+JSON.toJSONString(map));
                        		}
                    		}else if(msg_id.equalsIgnoreCase("CAMERA_SERVICE_STOP_GET_DATA")){
                    			if (client.userName.equalsIgnoreCase(toUserName)) {
                        			logger.info("关闭摄像头="+client.userName+",msg="+msg);
                    			}
                    		}else if(msg_id.equalsIgnoreCase("MECHINE_SERVICE_CONTROL")){
                    			if (client.userName.equalsIgnoreCase(toUserName)) {
                        			logger.info("远程控制="+client.userName+",msg="+msg);
                    			}
                    		}
                		}
                	}else{
                    	if ((client.userName.equalsIgnoreCase(fromUserName)) || (client.userName.equalsIgnoreCase(toUserName)) ) {
	                        client.session.getAsyncRemote().sendText(msg);
	            			logger.info(client.userName+" send message="+msg);
            			}
                	}
                }
            } catch (Exception e) {
                connections.remove(client);
                try {
                    client.session.close();
                } catch (Exception exception) {
        			logger.error("websocket client close error="+exception);
                }
        		logger.info("断开连接userName="+userName);
//                    String message = "{\"error_code\":3,\"userName\":"+client.userName+"}";//断开连接
//                    broadcast(message);
            }
//                break;
        }
    }
 
}
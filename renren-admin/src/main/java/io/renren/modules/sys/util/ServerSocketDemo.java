package io.renren.modules.sys.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

/**
 * ServerSocket 实现服务端与客户端通讯
 * 
 * @author PeicongHe
 *
 */
public class ServerSocketDemo {

	/**
     * 步骤： 
     * 1 先创建一个服务端，端口号为：8888
     * 2 等待客户端连接 
     * 3 创建一个客户端的输入流（用于将信息发送给服务端） 
     * 4 服务端打印并显示信息
     */
    public static void test1() {
        try {
            ServerSocket serverSocket = new ServerSocket(8888); // 创建一个服务端，监听端口8888
            Socket socket = serverSocket.accept(); // 等待客户端连接过来
            System.out.println("来客IP： " + socket.getInetAddress()); // 获取来客的IP地址
            InputStream is = socket.getInputStream();// 客户端的输入流
            Scanner sc = new Scanner(is);
            String msg = "";
            while (sc.hasNextLine()) {
                msg = sc.nextLine();
                System.out.println(msg);
                if (msg.equals("exit")) {
                    System.out.println("我要退出!");
                    System.exit(0);
                }
            }
            sc.close();
            is.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    
    /**
     * 增加自动回复功能 
     * 步骤: 
     *  1 在获取客户端输入流前添加一个客户端输出流（用于输出自动回复内容）
     *  2 打印输出流信息
     *  3  刷新打印
     */
    public static void test2() {
        try {
            ServerSocket serverSocket = new ServerSocket(8888);
            Socket socket = serverSocket.accept();
            System.out.println("来客ip: " + socket.getInetAddress());

            // 增加一个自动回复
            OutputStream os = socket.getOutputStream();// 添加一个客户端输出
            PrintWriter pw = new PrintWriter(os);// 打印出来
            pw.print("welcome to my home!");// 打印的信息
            pw.flush();// 刷新打印

            InputStream is = socket.getInputStream();
            Scanner sc = new Scanner(is);
            String msg = "";
            while (sc.hasNextLine()) {
                msg = sc.nextLine();
                System.out.println(msg);
                if (msg.equals("exit")) {
                    System.out.println("再见!我要退出!");
                    System.exit(0);
                }
            }
            sc.close();
            is.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    

	/**
     * 模拟一个广播电台，特点是只能服务端说话，不能客户端说话 
     * 步骤：
     * 1 创建一个服务端 
     * 2 接收一个客户端
     * 3 创建一个服务端的输入流（用于存储系统输入的数据流）
     * 4 创建一个客服的输出流（用于在客服上显示出数据）
     * 5 扫描打印，刷新打印
     */
     public static void broadcast(){
        try {
            ServerSocket server = new ServerSocket(8888);// 创建一个服务端，监听端口8888
            Socket socket = server.accept();// 等待客户端连接过来
            System.out.println("Ip: "+socket.getLocalAddress()+" 成功接入！ ");

            OutputStream serverops1 = socket.getOutputStream();// 获取来客的IP地址
            //自动回复
            PrintWriter pw1 = new PrintWriter(serverops1);
            pw1.write("welcome to my home!");
            pw1.flush();
            
            InputStream serverips = System.in;//在服务端输入广播内容做为输入流
            OutputStream serverops2 = socket.getOutputStream();//输出流用于传输信息给客户端
            PrintWriter pw = new PrintWriter(serverops2);
            //获取信息
            Scanner sc = new Scanner(serverips);
            String msg="";
            while(sc.hasNextLine()){
                msg = sc.nextLine();
                pw.println(msg);//输出信息
                pw.flush();
                if(msg.equals("exit")){
                    System.out.println("服务端讲话完毕，再见！");
                    System.exit(0);
                }
            }
            sc.close();
            serverips.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

     /**
      *  步骤：
      *  1 创建服务端 
      *  2 接收一个客户端 
      *  3 创建一个服务端的输入流（用于在服务端输入）
      *  4 创建一个客户端的输出流（用于在客户端显示）
      *  5 创建一个客户端的输入流 （用于在服务端显示）
      *  6 获取客户端发送的信息
      *  7 每次客户端输入一段话过来，我们都要从键盘输入一段话，并且发送给客户端
      */
     public static void connunication(){
     try {
         ServerSocket server = new ServerSocket(8888);// 创建一个服务端，监听端口8888
         Socket socket = server.accept();//接收一个客户端 

         Scanner scannerSystemIn = new Scanner(System.in);//创建一个服务端的输入流（用于在服务端输入）
         PrintWriter pw = new PrintWriter(socket.getOutputStream());//创建一个客户端的输出流（用于在客户端显示）
         Scanner scanner =new Scanner(socket.getInputStream());//创建一个客户端的输入流 （用于在服务端显示）

         String msg = "";
         String serverMsg ="";
         while(scanner.hasNextLine()){//获取客户端发送的信息
             msg=scanner.nextLine();
             System.out.println("client input: "+msg);
             //当输入exit 退出循环，结束通信
             if(msg.equals("exit")||serverMsg.equals("exit")){
                 System.out.println("exit");
                 System.exit(0);
             }
             //每次客户端输入一段话过来，我们都要从键盘输入一段话，并且发送给客户端
             if(scannerSystemIn.hasNextLine()){
                 serverMsg = scannerSystemIn.nextLine();
                 System.out.println("server input:" + serverMsg);
                 pw.println("server msg:"+serverMsg);
                 pw.flush();
             }
         }
         //关闭流
         pw.close();
         scannerSystemIn.close();
         scanner.close();
     } catch (IOException e) {
         e.printStackTrace();
     }
    }
         
    public static void main(String[] args){
    	connunication();
    }

}

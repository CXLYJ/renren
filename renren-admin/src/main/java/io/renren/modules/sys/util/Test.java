package io.renren.modules.sys.util;

import sun.misc.BASE64Encoder;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;

public class Test {

	public static String getImageStr(String path) {
    	InputStream inputStream = null;
        byte[] data = null;
        String contentType="";
    	try {
	        String fileName = path.substring(path.lastIndexOf("/") + 1, path.length());
	        String suffix = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
	        if ("jpg".equalsIgnoreCase(suffix) || "jpeg".equalsIgnoreCase(suffix)) {
    			contentType = "data:image/jpeg;base64,";
    		} else if ("png".equalsIgnoreCase(suffix)) {
    			contentType = "data:image/png;base64,";
    		} else if("aac".equalsIgnoreCase(suffix)){
    			contentType = "data:audio/aac;base64,";
    		} else if("mp3".equalsIgnoreCase(suffix)){
    			contentType = "data:audio/x-mpeg;base64,";
    		} else if("wav".equalsIgnoreCase(suffix)){
    			contentType = "data:audio/x-wav;base64,";
    		}
            inputStream = new FileInputStream(path);
            data = new byte[inputStream.available()];
            inputStream.read(data);
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //Base64 base64 = new Base64();audio/x-mei-aac
        // 加密
        BASE64Encoder encoder = new BASE64Encoder();
        //byte[] decode = base64.decode(data);
        String result = contentType+encoder.encode(data).replace("\r\n", "");
        System.out.println(result);
        return result;
    }
	
	public static void main(String[] args) {
		//getImageStr("F://baidu.mp3");
		int[] a={5,4,2,4,9,1};
		//Arrays.sort(a); //1.Arrays.sort排序
		//bubbleSort(a);//2冒泡排序法
		//selectSort(a);//3选择排序法
		insertSort(a);//4插入排序法
		for(int i: a){
			System.out.print(i);
		}
	}
	
	//2冒泡排序法
	public static int[] bubbleSort(int[] args){//冒泡排序算法
		for(int i=0;i<args.length-1;i++){
			for(int j=i+1;j<args.length;j++){
				if (args[i]>args[j]){
					int temp=args[i];
					args[i]=args[j];
					args[j]=temp;
				}
			}
		}
		return args;
	}

	//3选择排序法
	public static int[] selectSort(int[] args){//选择排序算法
		for (int i=0;i<args.length-1 ;i++ ){
			int min=i;
			for (int j=i+1;j<args.length ;j++ ){
				if (args[min]>args[j]){
					min=j;
				}
			}
			if (min!=i){
				int temp=args[i];
				args[i]=args[min];
				args[min]=temp;
			}
		}
		return args;
	}
	
	//4插入排序法
	public static int[] insertSort(int[] args){//插入排序算法
		for(int i=1;i<args.length;i++){
			for(int j=i;j>0;j--){
				if (args[j]<args[j-1]){
					int temp=args[j-1];
					args[j-1]=args[j];
					args[j]=temp;
				}else break;
			}
		}
		return args;
	}
	
}

    
 

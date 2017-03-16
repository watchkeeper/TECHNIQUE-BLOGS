package xyz.jayrui.forkjoin.asyn;

import java.io.File;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-15
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class AsynTest {
    public static void main(String[] args) {
//        ForkJoinPool pool = new ForkJoinPool();
//        FolderTask task = new FolderTask("d:\\",".log");
//
//        int start = Instant.now().getNano();
//        pool.execute(task);
//
//        pool.shutdown();
//        List<String> jar = task.join();
//        System.out.printf("total time is : %d------------------\n",Instant.now().getNano() - start );
//        jar.forEach(System.out::println);


        List<String> results = new ArrayList<>();
        int start = Instant.now().getNano();
        search("d:\\wcm\\","log", results);
        System.out.printf("total time is ::::%d\n",Instant.now().getNano() - start);
        results.forEach(System.out::println);
    }

    /**
     * 使用普通方法
     * @param path
     * @param extension
     */
    static void search(final String path,final String extension,final List<String> results){
        File file = new File(path);
        File[] files = file.listFiles();

        if(!Objects.isNull(files)) {
            for(File f : files){
                if(f.isDirectory()){
                    search(path,extension, results);
                }else{
                    if(f.getName().endsWith(extension)){
                        results.add(f.getAbsolutePath());
                    }
                }
            }
        }

    }
}

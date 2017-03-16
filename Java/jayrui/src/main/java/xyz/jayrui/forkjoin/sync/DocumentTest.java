package xyz.jayrui.forkjoin.sync;

import java.util.concurrent.ForkJoinPool;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-15
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class DocumentTest {
    public static void main(String[] args) {
        Document document = new Document();
        String[][] documents = document.getDocument(100, 500, "java");

        DocumentTask dt = new DocumentTask(documents,0,100,"java");

        ForkJoinPool pool = new ForkJoinPool();
//        pool.execute(dt);
        pool.submit(dt);

        try {
//            pool.awaitTermination(1,TimeUnit.SECONDS);
            pool.shutdown();
            System.out.printf("appears is : ------------>%d\n", dt.get());
        } catch (Exception e) {
            Thread.currentThread().interrupt();
        }
    }
}

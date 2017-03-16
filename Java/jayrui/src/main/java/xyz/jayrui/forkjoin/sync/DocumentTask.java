package xyz.jayrui.forkjoin.sync;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.RecursiveTask;

import lombok.EqualsAndHashCode;
import lombok.Value;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-15
 *
 * @author: huangrui
 * @Version: 1.0
 */
@Value
@EqualsAndHashCode(callSuper = true)
public class DocumentTask extends RecursiveTask<Integer> {
    private String document[][];
    private int start,end;
    private String word;

    @Override
    protected Integer compute() {
        int result = 0;
        if(end - start < 10){
            result = processLines(document,start,end,word);
        }else{
            int middle = (start + end) / 2;
            DocumentTask t1 = new DocumentTask(document,start,middle,word);
            DocumentTask t2 = new DocumentTask(document,middle,end,word);

            /*
              同步调用，允许使用work-stealing算法
             */
            invokeAll(t1,t2);
            try {
                result = t1.get() + t2.get();
            } catch (InterruptedException | ExecutionException e) {
                Thread.currentThread().interrupt();
            }
        }
        return result;
    }

    private int processLines(String[][] document, int start, int end, String word) {
        List<LineTask> lts = new ArrayList<>();
        for(int i = start;i<end ;i++){
            LineTask task = new LineTask(document[i],0,document[i].length,word);

            lts.add(task);
        }
        System.out.printf("size=%d,start=%d,end=%d\n" , lts.size(),start,end);
        invokeAll(lts);
        //合并计算值
        int result = 0;
        for (LineTask lt : lts)
            try {
                result += lt.get();
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        return result;
    }
}

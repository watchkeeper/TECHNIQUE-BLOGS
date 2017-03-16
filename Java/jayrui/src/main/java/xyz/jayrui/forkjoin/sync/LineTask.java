package xyz.jayrui.forkjoin.sync;

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
public class LineTask extends RecursiveTask<Integer> {
    private String line[];
    private int start,end;
    private String word;

    @Override
    protected Integer compute() {
        int result = 0;
        if(end - start < 100){
            result = count(line,start,end,word);
        }else{
            int middle = (start + end) / 2;
            LineTask t1 = new LineTask(line,start,middle ,word);
            LineTask t2 = new LineTask(line,middle ,end,word);
            invokeAll(t1,t2);
            try {
                result = t1.get() + t2.get();
            } catch (InterruptedException| ExecutionException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    private int count(String[] line, int start, int end, String word) {
        int count = 0;
        for(int i = start;i < end;i++){
            if(line[i].equals(word))
                count++;
        }
        return count;
    }
}

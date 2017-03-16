package xyz.jayrui.forkjoin;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.ForkJoinTask;
import java.util.concurrent.RecursiveTask;

import lombok.EqualsAndHashCode;
import lombok.Value;

/**
 * Description: 有返回值的<br>
 * <p>
 * Date: 2017-03-14
 *
 * @author: huangrui
 * @Version: 1.0
 */
@Value
@EqualsAndHashCode(callSuper = true)
public class SumTask extends RecursiveTask<Integer> {
    private static final int THERSHOLD = 2;//阈值

    private int start;

    private int end;

    @Override
    protected Integer compute() {
        int sum = 0;
        if(end - start <= THERSHOLD){
            for(int i = start;i <= end ;i++){
                sum += i;
            }
        }else{
            int middle = (start + end) / 2;
            SumTask st1 = new SumTask(start,middle );
            SumTask st2 = new SumTask(middle + 1,end);

            //开始执行子任务
            st1.fork();
            st2.fork();

            //等待其执行完成
            Integer sum1 = st1.join();
            Integer sum2 = st2.join();
            sum = sum1 + sum2;
        }
        return sum;
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ForkJoinPool pool = new ForkJoinPool();
        ForkJoinTask<Integer> result = pool.submit(new SumTask(1, 100));

        System.out.printf("sum = %d\n",result.get() );
    }
}

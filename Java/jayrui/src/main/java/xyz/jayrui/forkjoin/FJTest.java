package xyz.jayrui.forkjoin;

import java.util.List;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.TimeUnit;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-14
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class FJTest {
    public static void main(String[] args) {
        ProductionListGenerator generator = new ProductionListGenerator();

        List<Production> productions  = generator.generate(10000);

        ProductTask pt = new ProductTask(productions,0,productions.size(),0.2);
        ForkJoinPool pool = new ForkJoinPool();

        pool.execute(pt);

        do{
            System.out.printf("Main: Thread count:%d\n",pool.getActiveThreadCount());
            System.out.printf("Main: Thread Steal:%d\n",pool.getStealCount());
            System.out.printf("Main: Parallelism:%d\n",pool.getParallelism());
            try {
                TimeUnit.MILLISECONDS.sleep(5);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }while(!pt.isDone());

        pool.shutdown();

        if(pt.isCompletedNormally()){
            System.out.println("Main:the process has completed normally");
        }

        for(Production production : productions){
            if(production.getPrice() != 12)
                System.out.printf("Product %s :------------------ %f\n",production.getName(),production.getPrice());
        }

        System.out.println("Main : End of the process...");
    }
}

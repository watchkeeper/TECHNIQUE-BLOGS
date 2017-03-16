package xyz.jayrui.forkjoin;

import java.util.List;
import java.util.concurrent.RecursiveAction;

import lombok.EqualsAndHashCode;
import lombok.Value;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-14
 *
 * @author: huangrui
 * @Version: 1.0
 */
@Value
@EqualsAndHashCode(callSuper = true)
public class ProductTask extends RecursiveAction {
    private static final long serialVersionUID = 1L;

    private List<Production> productions;

    private int first;

    private int last;

    private double increment;


    @Override
    protected void compute() {
        if(last - first < 10){
            updatePrices();
        }else{
            int middle = (last + first) / 2;
            System.out.printf("Task: tasks ==== %s\n",getQueuedTaskCount());
            ProductTask pt1 = new ProductTask(productions,first,middle + 1,increment);
            ProductTask pt2 = new ProductTask(productions,middle + 1,last,increment);
            invokeAll(pt1,pt2);
        }
    }

    private void updatePrices() {
        for(int i = first;i < last;i++){
            Production production = productions.get(i);
            production.setPrice(production.getPrice() * (1 + increment));
        }
    }
}

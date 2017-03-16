package xyz.jayrui.forkjoin;

import lombok.Data;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-14
 *
 * @author: huangrui
 * @Version: 1.0
 */
@Data
public class Production {
    private String name;

    private double price;

    public Production(String name,double price){
        this.name = name;
        this.price = price;
    }

    public Production(){}
}

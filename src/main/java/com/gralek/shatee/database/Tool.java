package com.gralek.shatee.database;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
public class Tool {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    private Tool() {}

    public Tool(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tool tool = (Tool) o;
        return Objects.equals(id, tool.id) &&
                Objects.equals(name, tool.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
